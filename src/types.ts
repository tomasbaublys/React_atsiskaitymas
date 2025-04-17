export type User = {
  id: string;
  username: string;
  email: string;
  password: string;
  passwordText: string;
  profilePicture?: string;
  role: 'customer' | 'admin';
};
export type ChildrenProp = {
  children: React.ReactElement
}
export type UsersReducerActionTypes = 
{ type: 'setUsers', data: User[]} |
{ type: 'addUser', newUser: User }

export type UsersContextTypes = {
  loggedInUser: User | null,
  setLoggedInUser: React.Dispatch<React.SetStateAction<User | null>>,
  users: User[],
  dispatch: React.ActionDispatch<[UsersReducerActionTypes]>
}
export interface LoginValues {
  email: string;
  password: string;
  stayLoggedIn: boolean;
}
