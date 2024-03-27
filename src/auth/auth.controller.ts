import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { Response } from 'express'
// import { GitAuthGuard } from './guards/git.guard'
import { AuthService } from './auth.service'
import { GoogleAuthGuard } from './guards/google.guard'

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}
	// http://localhost:3000/api/auth/google/login
	@Get('google/login')
	@UseGuards(GoogleAuthGuard)
	handleLogin() {
		return { msg: 'Google Authentication' }
	}

	// api/auth/google/redirect
	@Get('google/redirect')
	@UseGuards(GoogleAuthGuard)
	handleRedirect(@Req() req, @Res({ passthrough: true }) res: Response) {
		// console.log(1, 'req.user', req.user)
		// res.redirect('http://localhost:3000/api')

		return { msg1: `Пользователь ${req.user.username} вошел в систему` }
	}

	// http://localhost:3000/api/auth/check
	@Get('check')
	async check(@Req() req, @Res({ passthrough: true }) res: Response) {
		return await this.authService.check(req)
	}

	// http://localhost:3000/api/auth/logout
	@Get('logout')
	logout(@Req() req, @Res({ passthrough: true }) res: Response) {
		return this.authService.logout(req, res)
	}

	// // http://localhost:3000/github
	// @Get('github')
	// @UseGuards(AuthGuard('github'))
	// async githubAuth(@Req() req) {}

	// @Get('github/callback')
	// @UseGuards(GitAuthGuard)
	// async githubAuthRedirect(
	// 	@Req() req,
	// 	@Res({ passthrough: true }) res: Response // passthrough: true Обязательная штука
	// ) {
	// 	// console.log(2, req.isAuthenticated()) // true
	// 	// console.log(3, req.session)
	// 	// console.log(4, req.user) // {true}
	// 	res.redirect('/')
	// }
}
