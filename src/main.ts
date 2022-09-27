import { Logger, ValidationPipe, VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { SerializerInterceptor } from './utils/serializer.interceptor';
import validationOptions from './utils/validation-options';

async function bootstrap(port = process.env.PORT || 8000) {
  const app = await NestFactory.create(AppModule, { cors: true });
  const configService = app.get(ConfigService);

  app.enableShutdownHooks();
  app.setGlobalPrefix(configService.get('app.apiPrefix'), {
    exclude: ['/'],
  });
  app.enableVersioning({
    type: VersioningType.URI,
  });
  app.useGlobalInterceptors(new SerializerInterceptor());
  app.useGlobalPipes(new ValidationPipe(validationOptions));

  const options = new DocumentBuilder()
    .setTitle('GUIDED API')
    .setDescription('GUIDED API docs')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('docs', app, document);

  await app.listen(port, () => {
    Logger.log('------');
    console.log();
    console.log(`App running at     http://localhost:${port}`);
    console.log(`Docs at            http://localhost:${port}/docs`);
    console.log(`OpenApi Doc at     http://localhost:${port}/docs-json`);
    console.log(`Health at          http://localhost:${port}/api/health`);
    console.log();
    Logger.log('------');
  });
}
void bootstrap();
