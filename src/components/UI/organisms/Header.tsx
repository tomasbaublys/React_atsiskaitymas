import { Link } from 'react-router';
import styled from 'styled-components';

const HeaderWrapper = styled.header`
  background-color: #121212;
  padding: 0.75rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #f5c518;
`;

const Logo = styled(Link)`
  font-size: 1.4rem;
  font-weight: 700;
  text-decoration: none;
  color: #f5c518;
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const NavLink = styled(Link)`
  color: white;
  text-decoration: none;
  font-size: 0.95rem;
  &:hover {
    text-decoration: underline;
  }
`;

const Avatar = styled.img`
  width: 28px;
  height: 28px;
  border-radius: 50%;
`;

const Header = () => {
  const isLoggedIn = false;

  return (
    <HeaderWrapper>
      <Logo to="/">BOOKS</Logo>
      <Nav>
        <NavLink to="/">Home</NavLink>
        {isLoggedIn && <NavLink to="/add">Add</NavLink>}
        {isLoggedIn ? (
          <>
            <Avatar src="/default-avatar.png" alt="user" />
            <NavLink to="/user/123">Tomas</NavLink>
            <NavLink to="/logout">Logout</NavLink>
          </>
        ) : (
          <>
            <NavLink to="/login">Login</NavLink>
            <NavLink to="/register">Register</NavLink>
          </>
        )}
      </Nav>
    </HeaderWrapper>
  );
};

export default Header;
