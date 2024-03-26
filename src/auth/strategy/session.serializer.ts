import { Injectable } from '@nestjs/common'
import { PassportSerializer } from '@nestjs/passport'

@Injectable()
export class SessionSerializer extends PassportSerializer {
	serializeUser(user: any, done: (err: Error, user: any) => void): any {
		done(null, user)
	}
	deserializeUser(
		payload: any,
		done: (err: Error, payload: string) => void
	): any {
		done(null, payload)
	}
}

// export class SessionSerializer extends PassportSerializer {
// 	constructor(
// 	  @Inject('AUTH_SERVICE') private readonly authService: AuthService,
// 	) {
// 	  super();
// 	}

// 	serializeUser(user: User, done: Function) {
// 	  console.log('Serializer User');
// 	  done(null, user);
// 	}

// 	async deserializeUser(payload: any, done: Function) {
// 	  const user = await this.authService.findUser(payload.id);
// 	  console.log('Deserialize User');
// 	  console.log(user);
// 	  return user ? done(null, user) : done(null, null);
// 	}
//   }
