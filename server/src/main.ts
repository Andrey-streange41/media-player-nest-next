import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const main = async () => {
  try {
    const PORT = process.env.PORT || 5000;
    const app = await NestFactory.create(AppModule);
    app.enableCors(); //send query from brovser
    await app.listen(PORT, () => {
      console.log(`App start on port ${PORT}`);
    });
  } catch (error) {
    console.error(error.message);
  }
};

main();
