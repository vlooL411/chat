import { Resolver } from '@nestjs/graphql';

import ContactService from './service';

@Resolver('Contact')
export default class ContactResolver {
	constructor(private contactService: ContactService) {}
}
