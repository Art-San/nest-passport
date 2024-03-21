import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import * as dotenv from 'dotenv'
import * as session from 'express-session'
import * as passport from 'passport'

dotenv.config() //process.env

async function bootstrap() {
	const app = await NestFactory.create(AppModule)

	app.use(
		session({
			secret: process.env.SESSION_SECRET,
			// secret: 'keyboard',
			resave: false,
			saveUninitialized: false,
		})
	)

	app.use(passport.initialize())
	app.use(passport.session())

	// app.setGlobalPrefix('api')

	await app.listen(5000)
}
bootstrap()
