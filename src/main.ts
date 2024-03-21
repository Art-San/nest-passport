import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import * as dotenv from 'dotenv'

dotenv.config() //process.env

async function bootstrap() {
	const app = await NestFactory.create(AppModule)

	// app.setGlobalPrefix('api')

	await app.listen(5000)
}
bootstrap()
