import { PassportModule } from '@nestjs/passport'
import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { UsersModule } from 'src/users/users.module'
import { LocalStrategy } from './strategy/local.strategy'
import { SessionSerializer } from './strategy/session.serializer'
import { GithubStrategy } from './strategy/github2.strategy'
import { AuthController } from './auth.controller'

@Module({
	imports: [UsersModule, PassportModule.register({ session: true })],
	providers: [AuthService, LocalStrategy, SessionSerializer],
	// providers: [AuthService, LocalStrategy, GithubStrategy, SessionSerializer],
	controllers: [AuthController],
})
export class AuthModule {}
