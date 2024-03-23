import { PassportModule } from '@nestjs/passport'
import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { UsersModule } from 'src/users/users.module'
import { LocalStrategy } from './strategy/local.strategy'
import { SessionSerializer } from './strategy/session.serializer'
import { GithubStrategy } from './strategy/github2.strategy'
import { AuthController } from './auth.controller'

@Module({
	controllers: [AuthController],
	imports: [
		PassportModule.register({
			session: true,
		}),
		UsersModule,
	],
	providers: [AuthService, GithubStrategy, SessionSerializer],
	// providers: [AuthService, LocalStrategy, GithubStrategy, SessionSerializer],
})
export class AuthModule {}
