// import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'

// @Injectable()
// export class AuthenticatedGuard implements CanActivate {
// 	async canActivate(context: ExecutionContext) {
// 		const request = context.switchToHttp().getRequest()
// 		return request.isAuthenticated()
// 	}
// }

import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common'
import { Observable } from 'rxjs'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class AuthenticatedGuard implements CanActivate {
	constructor(private configService: ConfigService) {}
	canActivate(
		context: ExecutionContext
	): boolean | Promise<boolean> | Observable<boolean> {
		const request = context.switchToHttp().getRequest()
		if (request.isAuthenticated()) {
			return true
		} else {
			const response = context.switchToHttp().getResponse()
			response.redirect(
				this.configService.get('CLIENT_BASE_URL') + '/api/login'
			)
			// response.redirect(`${process.env.CLIENT_BASE_URL}/login`)
			return false
		}
	}
}
