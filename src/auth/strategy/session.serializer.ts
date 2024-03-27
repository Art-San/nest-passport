// import { PassportSerializer } from '@nestjs/passport'
// import { UsersService } from 'src/users/users.service'

// export class SessionSerializer extends PassportSerializer {
// 	constructor(private readonly usersService: UsersService) {
// 		super()
// 	}

// 	serializeUser(user: any, done: Function) {
// 		console.log(11, 'Serializer User')
// 		done(null, user)
// 	}

// 	async deserializeUser(payload: any, done: Function) {
// 		console.log(12, 'deserializeUser', payload)
// 		//   const user = await this.usersService.findUser(payload.);
// 		//   console.log('Deserialize User');
// 		//   console.log(user);
// 		//   return user ? done(null, user) : done(null, null);
//
// 	}
// }

import { Injectable } from '@nestjs/common'
import { PassportSerializer } from '@nestjs/passport'

@Injectable()
export class SessionSerializer extends PassportSerializer {
	serializeUser(user: any, done: (err: Error, user: any) => void): any {
		// console.log(11, 'Serializer User', user)
		done(null, user)
	}
	deserializeUser(
		payload: any,
		done: (err: Error, payload: string) => void
	): any {
		// console.log(12, 'deserializeUser ', payload)

		done(null, payload)
	}
}
