import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { User } from './users.model'
@Injectable()
export class UsersService {
	constructor(@InjectModel('user') private readonly userModel: Model<User>) {}
	async registerUser(username: string, password: string) {
		const user = await this.userModel.findOne({ username: username })

		if (!user) {
			const newUser = new this.userModel({
				username,
				password,
			})

			await newUser.save()
			return newUser
		}
		return user
	}

	async getUser(username: string) {
		const user = await this.userModel.findOne({ username })
		return user
	}
}
