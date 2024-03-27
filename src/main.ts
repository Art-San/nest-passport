import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import * as dotenv from 'dotenv'
import * as session from 'express-session'
import * as passport from 'passport'

dotenv.config() //process.env

async function bootstrap() {
	const app = await NestFactory.create(AppModule)
	app.setGlobalPrefix('api')

	app.use(
		session({
			secret: process.env.SESSION_SECRET,
			resave: false,
			saveUninitialized: false,
			cookie: {
				maxAge: 60000,
			},
		})
	)

	app.use(passport.initialize())
	app.use(passport.session())

	await app.listen(process.env.PORT)
	console.log(`backend runs on por ${process.env.PORT}`)
}
bootstrap()
