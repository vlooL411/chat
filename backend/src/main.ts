import AppModule from 'src/app/module';
import { NestFactory } from '@nestjs/core';

const { NEXTAUTH_URL_CALLBACK } = process.env;
const { PORT } = process.env;

const bootstrap = async () => {
	const app = await NestFactory.create(AppModule);

	app.enableCors({
		origin: NEXTAUTH_URL_CALLBACK,
		credentials: true,
	});

	await app.listen(PORT);
};

export default bootstrap();
