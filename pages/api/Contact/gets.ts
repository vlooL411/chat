import DataApi from 'base/DataApi'
import { Contact } from '@backend'
import { NextApiRequest, NextApiResponse } from 'next'

import { AggregateLookUp, ContactProject } from './common'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  const dataApi = new DataApi(req, res);
  switch (method) {
    case "POST":
      try {
        const userid = await dataApi.TrustUserID();
        if (!userid) return;

        const contacts: Contact[] = await AggregateLookUp(userid)
          .replaceRoot("$contacts")
          .unwind("$User")
          .project(ContactProject);

        dataApi.True<Contact[]>(contacts ?? "Contacts are empty");
      } catch (error) {
        dataApi.Error(error, "Error request get contacts");
      }
      break;
    default:
      dataApi.Default();
  }
};
