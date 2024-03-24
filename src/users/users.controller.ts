import { Body, Controller, Post, Request, UseGuards, Get } from '@nestjs/common'
import { UsersService } from './users.service'
// import * as bcrypt from 'bcrypt'
// import { LocalAuthGuard } from 'src/auth/local.auth.guard'
import { AuthenticatedGuard } from 'src/auth/guards/authenticated.guard'

@Controller('users')
export class UsersController {
	constructor(private readonly usersService: UsersService) {}
	// post / signup
	// @Post('/signup')
	// async addUser(@Body() dto: any) {
	// 	const saltOrRounds = 10
	// 	const hashedPassword = await bcrypt.hash(dto.password, saltOrRounds)
	// 	const result = await this.usersService.registerUser(
	// 		dto.username,
	// 		hashedPassword
	// 	)
	// 	return {
	// 		msg: 'User successfully registered',
	// 		userId: result.id,
	// 		userName: result.username,
	// 	}
	// }

	// @UseGuards(LocalAuthGuard)
	// @Post('/login')
	// login(@Request() req): any {
	// 	return { User: req.user, msg: 'Пользователь вошел в систему' }
	// }

	// http://localhost:5000/api/users/protected
	@UseGuards(AuthenticatedGuard)
	@Get('/protected')
	getHello(@Request() req): string {
		console.log(1, 'req user', req.user)
		return req.user
	}
	// http://localhost:5000/api/users/logout
	@Get('/logout')
	logout(@Request() req): any {
		req.session.destroy()
		console.log(1, 'logout')
		return { msg: 'Сеанс пользователя завершен' }
	}
}
