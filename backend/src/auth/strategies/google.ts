import { PassportStrategy } from '@nestjs/passport';
import {
	Profile,
	Strategy,
	StrategyOptionsWithRequest,
	VerifyCallback,
} from 'passport-google-oauth20';
import { Injectable } from '@nestjs/common';
import { Provider, UserSafe } from 'src/graphql';

@Injectable()
export default class GoogleStrategy extends PassportStrategy(
	Strategy,
	Provider.google,
) {
	constructor() {
		const { env } = process;

		super({
			clientID: env.GOOGLE_ID,
			clientSecret: env.GOOGLE_SECRET,
			callbackURL: env.NEXTAUTH_URL_CALLBACK,
			scope: ['email', 'profile'],
		} as StrategyOptionsWithRequest);
	}

	async validate(
		accessToken: string,
		refreshToken: string,
		profile: Profile,
		done: VerifyCallback,
	): Promise<void> {
		const { id, name, emails, photos } = profile;

		const email = emails[0].value;
		const { familyName, givenName, middleName } = name;

		const user: UserSafe = {
			_id: null,
			provider: Provider.google,
			google: {
				_id: id,
				accessToken,
				refreshToken,
				email,
				familyName,
				givenName,
				middleName,
			},
			createdAt: new Date(),
			email,
			name: `${name.givenName} ${name.familyName}`,
			avatar: photos[0].value,
		};
		done(null, user);
	}
}
