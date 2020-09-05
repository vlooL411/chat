import IAuth from "./IAuth";
import { User } from "../apolloclient/types";

export default class AuthMongoDB implements IAuth {
  async SignIn(name: string, password: string): Promise<Response> {
    if (!name || !password) return null;
    return await fetch("/api/auth", {
      method: "POST",
      body: JSON.stringify({
        name,
        password,
      } as User),
    });
  }

  async SignUp(
    name: string,
    email: string,
    password: string
  ): Promise<Response> {
    if (!name || !email || !password) return null;
    return await fetch("/api/auth/reg", {
      method: "POST",
      body: JSON.stringify({
        name,
        email,
        password,
      } as User),
    });
  }

  async SignOut(): Promise<any> {
    await new Promise(localStorage.clear).then(() => "good bye");
  }
}
