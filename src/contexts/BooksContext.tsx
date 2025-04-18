import { createContext, useEffect, useReducer, useContext } from "react";
import { Book, ChildrenProp, ActionTypes, BooksContextTypes, UsersContextTypes } from "../types";
import UsersContext from "./UsersContext";

const reducer = (state: Book[], action: ActionTypes): Book[] => {
  switch (action.type) {
    case "setData":
      return action.data;
    case "addBook":
      return [...state, action.newBook];
    case "deleteBook":
      return state.filter((book) => book.id !== action.id);
    default:
      return state;
  }
};

const BooksContext = createContext<BooksContextTypes | undefined>(undefined);

const BooksProvider = ({ children }: ChildrenProp) => {
  const [books, dispatch] = useReducer(reducer, []);

  const { loggedInUser, setLoggedInUser } = useContext(UsersContext) as UsersContextTypes;

  const addNewBook = (newBook: Book) => {
    fetch(`http://localhost:8080/books`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newBook),
    });

    dispatch({
      type: "addBook",
      newBook,
    });
  };

  const removeOneBook = (id: Book["id"]) => {
    fetch(`http://localhost:8080/books/${id}`, {
      method: "DELETE",
    }).then(() => {
      dispatch({
        type: "deleteBook",
        id,
      });
    });
  };

  const saveOneBook = (id: Book["id"]) => {
    if (!loggedInUser) return;

    const savedBookIds = loggedInUser.savedBookIds || [];
    const updatedSavedIds = savedBookIds.includes(id)
      ? savedBookIds.filter((bookId) => bookId !== id)
      : [...savedBookIds, id];

    const updatedUser = { ...loggedInUser, savedBookIds: updatedSavedIds };

    fetch(`http://localhost:8080/users/${loggedInUser.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ savedBookIds: updatedUser.savedBookIds }),
    }).then(() => {
      setLoggedInUser(updatedUser);
      localStorage.setItem("loggedInUser", JSON.stringify(updatedUser));
    });
  };

  const findBook = (id: Book["id"]): Book | string => {
    const foundBook = books.find((book) => book.id === id);
    return foundBook || "Error: books not found";
  };

  useEffect(() => {
    fetch(`http://localhost:8080/books`)
      .then((res) => res.json())
      .then((data: Book[]) =>
        dispatch({
          type: "setData",
          data,
        })
      );
  }, []);

  return (
    <BooksContext.Provider
      value={{
        books,
        dispatch,
        addNewBook,
        removeOneBook,
        saveOneBook,
        findBook,
      }}
    >
      {children}
    </BooksContext.Provider>
  );
};

export { BooksProvider };
export default BooksContext;
