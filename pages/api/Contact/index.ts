import DataApi from 'base/DataApi'
import { Contact } from '@backend'
import { NextApiRequest, NextApiResponse } from 'next'

import { AggregateLookUp, ContactProject } from './common'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, body } = req;

  const dataApi = new DataApi(req, res);
  switch (method) {
    case "POST":
      try {
        const { contactid } = body as any;

        const userid = await dataApi.WrongTrustUserID(
          !contactid,
          "Enter contactid"
        );
        if (!userid) return;

        const contacts: Contact[] = await AggregateLookUp(userid)
          .replaceRoot("$contacts")
          .unwind("$User")
          .project(ContactProject);

        console.log(contacts);

        dataApi.True<Contact>(contacts.pop() ?? "Contact absent");
      } catch (error) {
        dataApi.Error(error, "Error request get contact");
      }
      break;
    default:
      dataApi.Default();
  }
};
