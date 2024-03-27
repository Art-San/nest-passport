import {
	Body,
	Controller,
	Post,
	Request,
	UseGuards,
	Get,
	Req,
} from '@nestjs/common'
import { UsersService } from './users.service'
import * as bcrypt from 'bcrypt'
// import { LocalAuthGuard } from 'src/auth/local.auth.guard'
import { AuthenticatedGuard } from 'src/auth/guards/authenticated.guard'
import { LocalAuthGuard } from 'src/auth/guards/local.guard'

interface IReq {
	msg: string
	username: string
	passwordEmail: string
}
@Controller('users')
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	// users/signup
	@Post('/signup')
	async addUser(@Body() dto: any) {
		const saltOrRounds = 10
		const hashedPassword = await bcrypt.hash(dto.password, saltOrRounds)
		const result = await this.usersService.registerUser(
			dto.username,
			hashedPassword
		)

		return {
			msg: 'User successfully registered',
			userId: result.id,
			userName: result.username,
		}
	}

	@UseGuards(LocalAuthGuard)
	@Post('/login')
	login(@Request() req): any {
		return { User: req.user, msg: 'Пользователь вошел в систему' }
	}

	// http://localhost:3000/api/users/check
	@Get('check')
	async check(@Req() req) {
		// console.log(1, 'check', req.isAuthenticated())
		if (req.isAuthenticated()) {
			return { user: req.user }
		} else {
			return { user: null }
		}
	}

	// http://localhost:3000/api/users/protected
	@UseGuards(AuthenticatedGuard)
	@Get('/protected')
	getHello(@Request() req): IReq {
		// console.log(1, 'req user', req.user)
		return {
			msg: 'Закрытый роут',
			username: req.user.username,
			passwordEmail: req.user.password,
		}
	}

	// http://localhost:3000/api/users/logout
	@Get('/logout')
	logout(@Request() req): any {
		req.session.destroy()
		return { msg: 'Сеанс пользователя завершен' }
	}
}
