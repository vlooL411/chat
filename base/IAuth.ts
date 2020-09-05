export default interface IAuth {
  SignIn(name: string, password: string): Promise<Response>;
  SignUp(name: string, email: string, password: string): Promise<Response>;
  SignOut(): Promise<Response>;
}
