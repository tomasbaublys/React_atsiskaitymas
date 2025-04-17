export type User = {
  id: string;
  username: string;
  email: string;
  password: string;
  passwordText: string;
  profilePicture?: string;
  dob: string;
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
export type Book = {
  id: string,
  title: string,
  description: string,
  image: string,
  createdAt: string,
  userId: string,
  saved?: boolean
}
export type ActionTypes = 
{ type: 'setData', data: Book[] } |
{ type: 'addBook', newBook: Book } |
{ type: 'deleteBook', id: Book['id']} |
{ type: 'saveBook', id: Book['id']}

export type BooksContextTypes = {
  books: Book[],
  dispatch: React.ActionDispatch<[action: ActionTypes]>,
  addNewBook: (newBook: Book) => void,
  removeOneBook: (id: Book["id"]) => void,
  saveOneBook: (id: Book["id"]) => void,
  findBook: (id: Book["id"]) => Book | string
}
