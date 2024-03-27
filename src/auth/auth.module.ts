import { PassportModule } from '@nestjs/passport'
import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { UsersModule } from 'src/users/users.module'
import { SessionSerializer } from './strategy/session.serializer'
import { GithubStrategy } from './strategy/github2.strategy'
import { AuthController } from './auth.controller'
import { MongooseModule } from '@nestjs/mongoose'
import { UserSchema } from 'src/users/users.model'
import { GoogleStrategy } from './strategy/google.strategy'

@Module({
	controllers: [AuthController],
	imports: [
		PassportModule.register({
			session: true,
		}),
		MongooseModule.forFeature([{ name: 'user', schema: UserSchema }]),
		UsersModule,
	],
	providers: [AuthService, GithubStrategy, GoogleStrategy, SessionSerializer],
	exports: [AuthService],
})
export class AuthModule {}
