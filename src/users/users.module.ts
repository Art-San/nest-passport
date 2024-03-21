import { Module } from '@nestjs/common'
import { UsersController } from './users.controller'
import { UsersService } from './users.service'
import { UserSchema } from './users.model'
import { MongooseModule } from '@nestjs/mongoose'

@Module({
	imports: [MongooseModule.forFeature([{ name: 'user', schema: UserSchema }])],
	controllers: [UsersController],
	providers: [UsersService],
	exports: [UsersService],
})
export class UsersModule {}
