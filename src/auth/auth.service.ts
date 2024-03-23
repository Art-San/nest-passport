import { Injectable, NotFoundException } from '@nestjs/common'
import { UsersService } from 'src/users/users.service'
import { Response, Request } from 'express'
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService {
	constructor(private readonly usersService: UsersService) {}
	// async validateUser(username: string, password: string): Promise<any> {
	// 	console.log(1, username)
	// 	console.log(2, password)
	// 	const user = await this.usersService.getUser(username)
	// 	const passwordValid = await bcrypt.compare(password, user.password)
	// 	if (!user) {
	// 		throw new NotFoundException('не удалось найти пользователя')
	// 	}
	// 	if (user && passwordValid) {
	// 		return {
	// 			userId: user.id,
	// 			userName: user.username,
	// 		}
	// 	}
	// 	return null
	// }

	async check(req: Request) {
		if (req.isAuthenticated()) {
			return { user: req.user }
		} else {
			return { user: null }
		}
	}

	async logout(req: Request, res: Response) {
		req.session.destroy((err) => {})
		return { message: 'Logged out' }
	}
}
