import { useContext, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router";
import UsersContext from "../../contexts/UsersContext";
import BooksContext from "../../contexts/BooksContext";
import { UsersContextTypes, BooksContextTypes, Book } from "../../types";
import BookCard from "../UI/molecules/BookCard";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const Container = styled.div`
  max-width: 1100px;
  margin: 2rem auto;
  padding: 0 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  
`;

const Title = styled.h2`
  font-size: 2rem;
  font-weight: 500;
  margin-bottom: 1rem;
  color: white;
  text-align: center;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 20px;
`;

const Message = styled.div`
  font-size: 14px;
  color: #aaa;
  margin-top: 20px;
  text-align: center;
`;

const User = () => {
  const { loggedInUser, getUserById } = useContext(UsersContext) as UsersContextTypes;
  const { books } = useContext(BooksContext) as BooksContextTypes;
  const navigate = useNavigate();

  useEffect(() => {
    if (!loggedInUser) {
      navigate("/login");
    }
  }, [loggedInUser, navigate]);

  if (!loggedInUser) return null;

  const savedBookIds = loggedInUser.savedBookIds || [];
  const savedBooks = books.filter((book: Book) => savedBookIds.includes(book.id));

  return (
    <Container>
      <Title>Your Saved Books</Title>
      {books.length === 0 ? (
        <Box display="flex" justifyContent="center" mt={6}>
          <CircularProgress sx={{ color: "#f5c518" }} />
        </Box>
      ) : savedBooks.length === 0 ? (
        <Message>You have no saved books.</Message>
      ) : (
        <Grid>
          {savedBooks.map((book) => (
            <BookCard
              key={book.id}
              book={book}
              author={getUserById(book.userId)}
              loggedInUser={loggedInUser}
            />
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default User;
