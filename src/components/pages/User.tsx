import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import UsersContext from "../../contexts/UsersContext";
import BooksContext from "../../contexts/BooksContext";
import { UsersContextTypes, BooksContextTypes, Book } from "../../types";
import BookCard from "../UI/molecules/BookCard";

const Container = styled.div`
  max-width: 1100px;
  margin: 2rem auto;
  padding: 0 1rem;
`;

const Title = styled.h2`
  font-size: 24px;
  margin-bottom: 16px;
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
`;

const Loader = styled.img`
  width: 60px;
  margin: 60px auto;
  display: block;
`;

const User = () => {
  const { loggedInUser } = useContext(UsersContext) as UsersContextTypes;
  const { books } = useContext(BooksContext) as BooksContextTypes;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  if (!loggedInUser) {
    return (
      <Container>
        <Message>You must be logged in to view this page.</Message>
      </Container>
    );
  }

  const savedBooks = books.filter(
    (book: Book) => book.userId === loggedInUser.id && book.saved
  );

  return (
    <Container>
      <Title>Your Saved Books</Title>
      {loading ? (
        <Loader src="/loading.gif" alt="Loading..." />
      ) : savedBooks.length === 0 ? (
        <Message>You have no saved books.</Message>
      ) : (
        <Grid>
          {savedBooks.map((book) => (
            <BookCard key={book.id} book={book} loggedInUser={loggedInUser} />
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default User;
