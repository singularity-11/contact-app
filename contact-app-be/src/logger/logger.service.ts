import { Injectable, LoggerService } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import winston from 'winston';
import 'winston-daily-rotate-file';
import { isObject } from '../utils/object';

@Injectable()
export class AppLoggerService implements LoggerService {
  private readonly appName: string;

  private readonly logger: winston.Logger;

  constructor(private readonly configService: ConfigService) {
    this.appName = this.configService.get('APP_NAME');

    this.logger = winston.createLogger({
      transports: [
        new winston.transports.DailyRotateFile({
          filename: 'logs/application-%DATE%.log',
          datePattern: 'YYYY-MM-DD-HH',
          zippedArchive: true,
          maxSize: '20m',
          maxFiles: '14d',
          level: this.configService.get('FILE_LOG_LEVEL'),
          silent: !this.configService.get('FILE_LOG_ENABLED'),
          format: winston.format.combine(
            winston.format.splat(),
            winston.format.timestamp(),
            this.readableFormat(),
          ),
        }),
        new winston.transports.Console({
          level: this.configService.get('CONSOLE_LOG_LEVEL'),
          silent: !this.configService.get('CONSOLE_LOG_ENABLED'),
          format: winston.format.combine(
            winston.format.colorize(),
            winston.format.splat(),
            winston.format.timestamp(),
            this.readableFormat(
              this.configService.get('SHOW_DATA_ON_CONSOLE_LOGGER'),
            ),
          ),
        }),
      ],
    });
  }

  log(message: any, context: string) {
    this.logger.info(this.getLogObject(message, context));
  }

  error(message: any, stack: string, context: string) {
    this.logger.error(this.getLogObject(message, context, stack));
  }

  warn(message: any, context: string) {
    this.logger.warn(this.getLogObject(message, context));
  }

  debug(message: any, context: string) {
    this.logger.debug(this.getLogObject(message, context));
  }

  verbose(message: any, context: string) {
    this.logger.verbose(this.getLogObject(message, context));
  }

  private getLogObject(message: string, context: string, stack?: string) {
    return {
      message,
      context,
      stack,
    };
  }

  private readableFormat(showData = true) {
    return winston.format.printf(({ level, message, timestamp, ...meta }) => {
      const parts = [];
      const { context, stack, ...rest } = meta;
      const { data = undefined, ...messageObject } = isObject(message)
        ? { ...message }
        : { message };

      parts.push(timestamp);

      if (this.appName) {
        parts.push(`[${this.appName}]`);
      }

      if (context) {
        parts.push(`[${context}]`);
      }

      parts.push(`[${level}]:`);

      const logObject = { ...messageObject, ...rest };

      if (showData) {
        logObject.data = data;
      }

      parts.push(JSON.stringify(logObject));

      if (stack) {
        parts.push(`\n${stack}`);
      }

      return parts.join(' ');
    });
  }
}
