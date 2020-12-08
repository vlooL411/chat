import { ExtractJwt } from 'passport-jwt';
import { JwtService } from '@nestjs/jwt';
import {
	ExecutionContext,
	Injectable,
	UnauthorizedException,
	UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Token, TokenType } from 'src/graphql';
import { GqlExecutionContext } from '@nestjs/graphql';

import AuthConfig from '../config';

@Injectable()
class gqlGuard extends AuthGuard('jwt') {
	constructor(private readonly jwtService: JwtService) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			secretOrKey: AuthConfig().accessToken.secret,
		});
	}

	validate(token: Token): boolean {
		try {
			return !!this.jwtService.verify(token);
		} catch (e) {
			throw new UnauthorizedException(e);
		}
	}

	getRequest(context: ExecutionContext) {
		const ctx = GqlExecutionContext.create(context);
		return ctx.getContext().req;
	}

	canActivate(context: ExecutionContext): boolean {
		const ctx = GqlExecutionContext.create(context).getContext();

		const token = ctx?.headers[TokenType.authentication];
		const auth = this.validate(token);
		return auth;
	}
}

const GQLGuard = (): MethodDecorator & ClassDecorator => UseGuards(gqlGuard);

export default GQLGuard;
