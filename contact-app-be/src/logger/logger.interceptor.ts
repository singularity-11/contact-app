import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
  HttpStatus,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request, Response } from 'express';
import { catchError, tap } from 'rxjs/operators';
import { ServerResponse } from 'http';

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
  private readonly logger = new Logger(this.constructor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = context.switchToHttp();
    const res = ctx.getResponse<Response>();
    const req = ctx.getRequest<Request>();

    this.logger.log({
      method: req.method,
      type: 'request',
      path: req.path,
      body: req.body,
      query: req.query,
      params: req.params,
    });

    return next.handle().pipe(
      tap((data) => {
        const shouldLogData = this.shouldLogData(data);

        this.logger.log({
          method: req.method,
          type: 'response',
          path: req.path,
          status: res.statusCode,
          message: res.statusMessage || res.getHeader('statusmessage'),
          data: shouldLogData ? data : undefined,
        });
      }),
      catchError((error) => {
        const {
          status = HttpStatus.INTERNAL_SERVER_ERROR,
          message,
          response = message,
          stack = '',
        } = error;

        this.logger.error(
          {
            method: req.method,
            type: 'response',
            path: req.path,
            status,
            message,
            response,
            body: req.body,
            query: req.query,
            params: req.params,
          },
          stack,
        );

        throw error;
      }),
    );
  }

  shouldLogData(data: unknown) {
    if (data instanceof ServerResponse) {
      return false;
    }

    return true;
  }
}
