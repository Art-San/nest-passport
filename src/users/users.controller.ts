import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common'
import { UsersService } from './users.service'
import * as bcrypt from 'bcrypt'
import { LocalAuthGuard } from 'src/auth/local.auth.guard'
@Controller('users')
export class UsersController {
	constructor(private readonly usersService: UsersService) {}
	//post / signup
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
		return { User: req.user, msg: 'User logged in' }
	}
}
