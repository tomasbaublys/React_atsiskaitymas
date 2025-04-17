import { Route, Routes } from "react-router";
import MainOutlet from "./components/outlets/MainOutlet";
import Home from "./components/pages/Home";
import Login from "./components/pages/Login ";
import Register from "./components/pages/Register";
import AddBook from "./components/pages/AddBook";
import User from "./components/pages/User";

const App = () => {

  return (
    <>
      <Routes>
        <Route path="" element={<MainOutlet />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="add" element={<AddBook />} />
          <Route path="user/:id" element={<User />} />
        </Route>
      </Routes>
    </>
  )
}

export default App;