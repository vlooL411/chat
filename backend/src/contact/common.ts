import { Aggregate, Model, Types } from 'mongoose';
import { Contact } from 'src/graphql';
import { UserDocument } from 'src/user/entity';

export const AggregateFilter = (
	_id: string,
	users: Model<UserDocument>,
): Aggregate<Contact[]> =>
	users
		.aggregate()
		.match({ _id: new Types.ObjectId(_id) })
		.project({ _id: false, contacts: true })
		.unwind('$contacts');

export const ContactLookUp = {
	from: 'users',
	localField: 'contacts.userid',
	foreignField: '_id',
	as: 'contacts.User',
};

export const AggregateLookUp = (
	_id: string,
	users: Model<UserDocument>,
): Aggregate<Contact[]> => AggregateFilter(_id, users).lookup(ContactLookUp);

export const ContactProject = {
	userid: true,
	date: true,
	whoIsContact: true,
	User: {
		_id: true,
		name: true,
		image: true,
		status: true,
		dateLastOnline: true,
	},
};
