import { Inject, Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Profile, Strategy } from 'passport-google-oauth20'
import { AuthService } from '../auth.service'
import { UsersService } from 'src/users/users.service'

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
	constructor(
		private readonly authService: AuthService,
		private readonly usersService: UsersService
	) {
		super({
			clientID: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
			callbackURL: 'http://localhost:3000/api/auth/google/redirect',
			passReqToCallback: true, // false: error,  Обязательная штука, не работало без этого
			scope: ['profile', 'email'],
		})
	}

	async validate(
		request: any,
		accessToken: string,
		refreshToken: string,
		profile: Profile
	) {
		console.log(1, request)
		console.log(1, accessToken)
		console.log(1, refreshToken)
		// const user = await this.authService.validateUser({
		// 	email: profile.emails[0].value,
		// 	displayName: profile.displayName,
		// })

		const user = await this.usersService.registerUser(
			profile.displayName,
			profile.displayName
		)

		return user || null
	}
}
