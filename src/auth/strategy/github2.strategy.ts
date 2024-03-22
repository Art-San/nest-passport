import passport from 'passport'
import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Profile, Strategy as GitHubStrategy } from 'passport-github2'
import { AuthService } from '../auth.service'
import { UsersService } from 'src/users/users.service'

@Injectable()
export class GithubStrategy extends PassportStrategy(GitHubStrategy, 'github') {
	constructor(
		private readonly authService: AuthService,
		private readonly usersService: UsersService
	) {
		super({
			clientID: process.env.GITHUB_ID,
			clientSecret: process.env.GITHUB_SECRET,
			callbackURL: '/api/auth/github/callback',
			scope: ['user:email'],
		})
	}

	async validate(
		accessToken: string,
		refreshToken: string,
		profile: Profile, // ?
		// profile: any,
		done: Function
	) {
		console.log(1, 'profile.username', profile.username)
		const user = await this.authService.validateUser(
			profile.username,
			profile.username
		)
		if (!user) {
			const newUser = await this.usersService.registerUser(
				profile.username,
				profile.username
			)

			done(null, newUser)
		} else {
			done(null, user)
		}
	}
}
