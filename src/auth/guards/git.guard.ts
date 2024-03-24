import { ExecutionContext, Injectable } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
@Injectable()
export class GitAuthGuard extends AuthGuard('github') {
	async canActivate(context: ExecutionContext) {
		const result = (await super.canActivate(context)) as boolean
		const request = context.switchToHttp().getRequest()
		await super.logIn(request)
		console.log(1, result)
		return result
	}
}
