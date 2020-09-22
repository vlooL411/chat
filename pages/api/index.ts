import { ID } from "apolloclient/types";

export namespace API {
  export namespace User {
    export type GetBody = { id: ID };
    export type idBody = { name: string; email: string };
  }
  export namespace Chat {
    export type GetBody = { chatid: ID };
    export type CreateBody = { title: string };
    export type RemoveBody = { chatid: ID };
    export type FindBody = { title: string };
    export type InviteBody = { chatid: ID };
    export type LeaveBody = { chatid: ID };
  }
  export namespace Message {
    export type GetsBody = { chatid: ID; messageid?: ID; limit?: number };
    export type SendBody = { chatid: ID; text: string };
    export type ChangeBody = { chatid: ID; text: string; messageid: ID };
    export type RemoveBody = { chatid: ID; messageid: ID };
    export type FindBody = { text: string };
  }
}
