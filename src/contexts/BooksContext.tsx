import { createContext, useEffect, useReducer } from "react";

import { Book, ChildrenProp, ActionTypes, BooksContextTypes } from "../types";
import { useNavigate } from "react-router";

const reducer = (state: Book[], action: ActionTypes) => {
    switch(action.type){
        case 'setData':
            return action.data;
        case 'addBook':
            return [...state, action.newBook];
        case 'deleteBook':
            return state.filter(book => book.id !== action.id);
        case 'saveBook':
            return state.map(el => {
                if(el.id === action.id){
                  return {
                    ...el,
                    saved: !el.saved
                  }
                }else { return el }
              })
        default:
            return state;
    }
}

const BooksContext = createContext<undefined | BooksContextTypes>(undefined);
const BooksProvider = ({ children }: ChildrenProp) => {

    const [books, dispatch] = useReducer(reducer,[]);
    const navigate = useNavigate();

    const addNewBook = (newBook: Book) => {
        fetch(`http://localhost:8080/books`, {
            method: "POST",
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify(newBook)
        });
        dispatch({
            type: 'addBook',
            newBook
        });
    }

    const removeOneBook = (id: Book['id']) => {
        fetch(`http://localhost:8080/books/${id}`, {
            method: "DELETE"
        })
        .then(() => {
            dispatch({
                type: 'deleteBook',
                id
            });
            navigate('/')
        })
    }

    const saveOneBook = (id: Book['id']) => {
        const book = books.find(book => book.id === id); 
        if (!book) return;

        fetch(`http://localhost:8080/books/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify({saved: !book.saved})
        });
        dispatch({
            type:'saveBook',
            id
        });
    }

    const findBook = (id: Book['id']): Book | string => {
        const foundBook = books.find(book => book.id === id);
        if(foundBook){
            return foundBook;
        } else{
            return 'Error: books not found';
        }
    }

    useEffect(() => {
        fetch(`http://localhost:8080/books`)
        .then(res => res.json())
        .then((data: Book[]) => dispatch({
            type:'setData',
            data
        }));
    }, []);

    return(
        <BooksContext.Provider
            value={{ 
                books,
                dispatch,
                addNewBook,
                removeOneBook,
                saveOneBook,
                findBook
            }}
        >
            { children }
        </BooksContext.Provider>
    )
}

export {BooksProvider};
export default BooksContext;
