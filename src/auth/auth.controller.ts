import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { Response } from 'express'
import { GitAuthGuard } from './guards/git.guard'

@Controller('auth')
export class AuthController {
	@Get('github')
	@UseGuards(AuthGuard('github'))
	async githubAuth(@Req() req) {}

	@Get('github/callback')
	@UseGuards(GitAuthGuard)
	// @UseGuards(AuthGuard('github'))
	async githubAuthRedirect(
		@Req() req,
		@Res({ passthrough: true }) res: Response // passthrough: true Обязательная штука
	) {
		console.log(2, req.isAuthenticated()) // true
		console.log(3, req.session)
		console.log(4, req.user) // {true}
		res.redirect('/test')
	}
}
