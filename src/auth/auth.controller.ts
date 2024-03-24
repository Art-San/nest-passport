import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { Response } from 'express'
import { GitAuthGuard } from './guards/git.guard'
import { AuthService } from './auth.service'

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}
	// http://localhost:3000/github
	@Get('github')
	@UseGuards(AuthGuard('github'))
	async githubAuth(@Req() req) {}

	@Get('github/callback')
	@UseGuards(GitAuthGuard)
	async githubAuthRedirect(
		@Req() req,
		@Res({ passthrough: true }) res: Response // passthrough: true Обязательная штука
	) {
		// console.log(2, req.isAuthenticated()) // true
		// console.log(3, req.session)
		// console.log(4, req.user) // {true}
		res.redirect('/')
	}

	// http://localhost:5000/api/auth/check
	@Get('check')
	async check(@Req() req, @Res({ passthrough: true }) res: Response) {
		return await this.authService.check(req)
	}

	@Get('logout')
	logout(@Req() req, @Res({ passthrough: true }) res: Response) {
		return this.authService.logout(req, res)
	}
}
