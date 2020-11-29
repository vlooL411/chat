import {
	Injectable,
	NestInterceptor,
	ExecutionContext,
	CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export default class AuthInterceptor implements NestInterceptor {
	intercept(context: ExecutionContext, next: CallHandler): Observable<void> {
		return next.handle().pipe(
			map(data => {
				const ctx = context.switchToHttp();
				const req = ctx.getRequest();
				req.res.header('x-api-key', 'pretty secure');
				return data;
			}),
		);
	}
}
