import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { SwaggerTheme, SwaggerThemeNameEnum } from 'swagger-themes';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('nt-cfo-api');

  const config = new DocumentBuilder()
    .setTitle('NT CFO API')
    .setDescription('API Documentation for NT CFO System')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  
  const document = SwaggerModule.createDocument(app, config);
  const theme = new SwaggerTheme();
  
  const customCss = theme.getBuffer(SwaggerThemeNameEnum.FLATTOP) + `
    .opblock-tag[data-tag="Dynamic Admin Role API Engine"],
    .opblock-tag[data-tag="Dynamic Admin Role API Engine"] a,
    .opblock-tag[data-tag="Dynamic Admin Role API Engine"] span {
      color: red !important;
    }
  `;

  SwaggerModule.setup('docs', app, document, {
    useGlobalPrefix: true,
    customCss: customCss,
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
