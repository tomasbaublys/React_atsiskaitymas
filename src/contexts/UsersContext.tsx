import { createContext, useState, useReducer, useEffect } from "react";

import { User, ChildrenProp, UsersContextTypes, UsersReducerActionTypes } from "../types";

const reducer = (state: User[], action: UsersReducerActionTypes): User[] => {
    switch (action.type) {
      case "setUsers":
        return action.data;
      case "addUser":
        fetch(`http://localhost:8080/users`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(action.newUser),
        });
        return [...state, action.newUser];
    }
  };

const UsersContext = createContext<UsersContextTypes | undefined>(undefined);

const UsersProvider = ({ children }: ChildrenProp) => {

  const [users, dispatch] = useReducer(reducer, []);
  const [loggedInUser, setLoggedInUser] = useState<User | null>(() => {
    try {
      const stored = localStorage.getItem("loggedInUser");
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    fetch(`http://localhost:8080/users`)
      .then(res => res.json())
      .then(data => dispatch({
        type: 'setUsers',
        data: data
      }))
  }, []);

  return (
    <UsersContext.Provider
      value={{
        loggedInUser,
        setLoggedInUser,
        users,
        dispatch
      }}
    >
      {children}
    </UsersContext.Provider>
  );
};

export { UsersProvider };
export default UsersContext;
