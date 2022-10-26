import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  // Crear nuevo modulo de arranque
  const app = await NestFactory.create(AppModule);

  // Tuberia de validaciones 
  app.useGlobalPipes(new ValidationPipe({
    transform: true, // Si se establece en true, básicamente se trata de transformar algunos datos de entrada a otro formato. Por ejemplo, transformar cadena en entero.
    whitelist: true, // Si se establece en true, validator despojará al objeto validado (devuelto) de cualquier propiedad que no utilice ningún decorador de validación
    forbidNonWhitelisted: true // Si se establece en true, en lugar de quitar las propiedades que no están en la lista blanca, el validador generará una excepción.
  }))

  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));


  // Implementacion de documentacion y testing de api
  const config = new DocumentBuilder()
    .setTitle('Ejercicio practico Backend Developer')
    .setDescription('Ejercicio para evaluar el conocimiento para resolucion de problemas informativos')
    .setVersion('1.0')
    .addTag('eval')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/', app, document)


  // Ejecutar la aplicacion por el puerto 3000
  await app.listen(3010);
}
bootstrap();
