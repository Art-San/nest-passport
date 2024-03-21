import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { User } from './users.model'
@Injectable()
export class UsersService {
	constructor(@InjectModel('user') private readonly userModel: Model<User>) {}
	async registerUser(userName: string, password: string) {
		const username = userName.toLowerCase()
		const user = await this.userModel.findOne({ username: username })

		if (user) {
			throw new BadRequestException('Юзер с таким email есть уже в системе')
		}

		const newUser = new this.userModel({
			username,
			password,
		})

		await newUser.save()
		return newUser
	}

	async getUser(userName: string) {
		const username = userName.toLowerCase()
		const user = await this.userModel.findOne({ username })
		return user
	}
}
