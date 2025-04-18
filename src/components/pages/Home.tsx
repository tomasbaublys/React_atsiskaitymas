import { useContext } from "react";
import styled from "styled-components";
import BooksContext from "../../contexts/BooksContext";
import UsersContext from "../../contexts/UsersContext";
import { BooksContextTypes, UsersContextTypes } from "../../types";
import BookCard from "../UI/molecules/BookCard";
import CircularProgress from "@mui/material/CircularProgress";

const Wrapper = styled.main`
  max-width: 1100px;
  margin: 0 auto;
  padding: 2rem 1rem;
  /* text-align: center; */
`;

const Title = styled.h2`
  font-size: 2rem;
  font-weight: 500;
  margin-bottom: 1rem;
  color: white;
  text-align: center;
`;

const Message = styled.p`
  font-size: 1rem;
  color: #ccc;
`;

const BookList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 20px;
`;

const LoaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 60px;
`;

const Home = () => {
  const { books } = useContext(BooksContext) as BooksContextTypes;
  const { loggedInUser, getUserById } = useContext(UsersContext) as UsersContextTypes;

  const isLoading = books.length === 0;

  return (
    <Wrapper>
      <Title>All Books</Title>

      {isLoading ? (
        <LoaderWrapper>
          <CircularProgress sx={{ color: "#f5c518" }} />
        </LoaderWrapper>
      ) : books.length === 0 ? (
        <Message>No books found.</Message>
      ) : (
        <BookList>
          {books.map((book) => (
            <BookCard
              key={book.id}
              book={book}
              author={getUserById(book.userId)}
              loggedInUser={loggedInUser}
            />
          ))}
        </BookList>
      )}
    </Wrapper>
  );
};

export default Home;
