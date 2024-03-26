import { PassportStrategy } from '@nestjs/passport'
import { Profile, Strategy as GitHubStrategy } from 'passport-github2'

import { Injectable } from '@nestjs/common'
import { UsersService } from 'src/users/users.service'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { User } from 'src/users/users.model'

@Injectable()
export class GithubStrategy extends PassportStrategy(GitHubStrategy, 'github') {
	constructor(
		@InjectModel('user') private readonly userModel: Model<User>,
		private readonly usersService: UsersService
	) {
		// Если passReqToCallback установлено в true, то request будет первым аргументом,
		// а accessToken, refreshToken, и profile будут следующими аргументами.
		// Это позволяет вам иметь доступ к объекту запроса внутри функции validate,
		// что может быть полезно для доступа к сессии, куки или другим данным запроса,
		// которые могут быть необходимы для обработки аутентификации
		super({
			clientID: process.env.GITHUB_ID,
			clientSecret: process.env.GITHUB_SECRET,
			callbackURL: '/api/auth/github/callback',
			passReqToCallback: true, // false: error,  Обязательная штука, не работало без этого
			scope: ['user:email'],
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
		// console.log(1, 'profile.username', profile.username) // Art-San

		const user = await this.usersService.registerUser(
			profile.username,
			profile.username
		)

		done(null, user)
	}
}
