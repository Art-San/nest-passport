import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { MongooseModule } from '@nestjs/mongoose'
import { UsersModule } from './users/users.module'
import { ConfigService } from '@nestjs/config'
import { AuthModule } from './auth/auth.module'

const configService = new ConfigService() // не работает  configService.get('MONGO_DB_URI')
@Module({
	imports: [
		AuthModule,
		UsersModule,
		// MongooseModule.forRoot(process.env.MONGO_DB_UR), не работает
		MongooseModule.forRoot('mongodb://127.0.0.1:27017/session-based-auth'),
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
