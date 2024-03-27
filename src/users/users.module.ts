import { Module } from '@nestjs/common'
import { UsersController } from './users.controller'
import { UsersService } from './users.service'
import { UserSchema } from './users.model'
import { MongooseModule } from '@nestjs/mongoose'
import { ConfigModule, ConfigService } from '@nestjs/config'

@Module({
	imports: [
		MongooseModule.forFeature([{ name: 'user', schema: UserSchema }]),
		// ConfigModule,
	],
	controllers: [UsersController],
	providers: [UsersService, ConfigService],
	exports: [UsersService],
})
export class UsersModule {}
