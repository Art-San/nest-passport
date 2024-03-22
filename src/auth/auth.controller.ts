import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common'
import { Response } from 'express'
import { AuthGuard } from '@nestjs/passport'

@Controller('auth')
export class AuthController {
	@Get('github')
	@UseGuards(AuthGuard('github'))
	async githubAuth(@Req() req) {}

	@Get('github/callback')
	@UseGuards(AuthGuard('github'))
	async githubAuthRedirect(
		@Req() req,
		@Res({ passthrough: true }) res: Response // passthrough: true Обязательная штука
	) {
		res.redirect('/test')
	}
}
