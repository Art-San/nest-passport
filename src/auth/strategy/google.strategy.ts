import { Inject, Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Profile, Strategy } from 'passport-google-oauth20'
import { AuthService } from '../auth.service'
import { UsersService } from 'src/users/users.service'

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
	constructor(
		// private readonly authService: AuthService,
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
		profile: Profile,
		done: Function
	) {
		// console.log(0, 'request', request)
		// console.log(1, 'accessToken', accessToken) // yaxH_oMxXkO.........
		// console.log(2, 'refreshToken', refreshToken) // undefined
		// console.log(3, 'profile', profile) // {Александр А'}
		// console.log(4, 'profile.displayName', profile.displayName) // {Александр А'}
		// console.log(5, 'profile.emails', profile.emails[0].value) // artsan@gmail.com

		// const user = await this.authService.validateUser({
		// 	email: profile.emails[0].value,
		// 	displayName: profile.displayName,
		// })

		const user = await this.usersService.registerUser(
			profile.displayName,
			profile.emails[0].value // email вместо пароля
		)

		done(null, user)
		//==========================================================
		// https://github.com/stuyy/google-nestjs-oauth2/blob/master/src/auth/utils/GoogleStrategy.ts
		// return user || null
		// https://www.youtube.com/watch?v=OitgkKTxht4
		//========================================================
	}
}
