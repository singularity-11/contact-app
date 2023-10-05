import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { AppLoggerService } from './logger/logger.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = app.get(AppLoggerService);

  app.useLogger(logger);
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.enableCors();

  const configService = app.get(ConfigService);
  const config = new DocumentBuilder()
    .setTitle(`${configService.get('APP_NAME')} API`)
    .setDescription(`${configService.get('APP_NAME')} API documentation`)
    .setVersion(process.env.npm_package_version)
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup(configService.get('DOCUMENTATION_URL'), app, document, {
    swaggerOptions: {
      persistAuthorization: true,
      tagsSorter: 'alpha',
      operationsSorter: (a, b) => {
        const methodsOrder = ['get', 'post', 'put', 'delete'];
        const result =
          methodsOrder.indexOf(a.get('method')) -
          methodsOrder.indexOf(b.get('method'));

        if (result !== 0) {
          return result;
        }

        return a.get('path').localeCompare(b.get('path'));
      },
    },
  });

  await app.listen(configService.get('PORT') || 5000);

  logger.log(`Application is running on: ${await app.getUrl()}`, 'Bootstrap');
  logger.log(
    `Documentation is available on: ${await app.getUrl()}/${configService.get(
      'DOCUMENTATION_URL',
    )}`,
    'Bootstrap',
  );
}

bootstrap();
