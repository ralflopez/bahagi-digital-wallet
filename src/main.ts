import { NestFactory } from '@nestjs/core';
import * as session from 'express-session';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const urlObject = new URL(process.env.BASE_URL || 'http://localhost');
  const hostName = urlObject.hostname;
  const domainName = hostName.replace(/^[^.]+\./g, '');

  // express session
  app.use(
    session({
      cookie: {
        domain: domainName,
      },
      secret: 'secret',
      resave: false,
      saveUninitialized: false,
    }),
  );

  await app.listen(process.env.PORT || 4000);
}
bootstrap();
