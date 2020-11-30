import AuthGuard from 'src/auth/guards';
import { Args, Query } from '@nestjs/graphql';
import { Resolver } from '@nestjs/graphql';
import { CurrentUser } from 'src/auth/decorators';
import { Contact, Contacts, UserSafe } from 'src/graphql';

import ContactService from './service';

@Resolver('Contact')
export default class ContactResolver {
	constructor(private contactService: ContactService) {}

	@AuthGuard()
	@Query()
	async Contacts(@CurrentUser() { _id }: UserSafe): Promise<Contact[]> {
		return this.contactService.contacts(_id);
	}

	@AuthGuard()
	@Query()
	async FindContacts(
		@CurrentUser() { _id }: UserSafe,
		@Args('text') text: string,
	): Promise<Contacts> {
		return this.contactService.findContacts(_id, text);
	}
}
