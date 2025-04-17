import { useContext } from 'react';
import styled from 'styled-components';

import BooksContext from '../../contexts/BooksContext';
import UsersContext from '../../contexts/UsersContext';
import { BooksContextTypes, UsersContextTypes } from '../../types';
import BookCard from '../UI/molecules/BookCard';

const Wrapper = styled.main`
  max-width: 1000px;
  margin: 0 auto;
  padding: 2rem 1rem;
  text-align: center;
`;

const Title = styled.h2`
  font-size: 2rem;
  font-weight: 500;
  margin-bottom: 1rem;
  color: white;
`;

const Message = styled.p`
  font-size: 1rem;
  color: #ccc;
`;

const BookList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
`;

const Home = () => {
  const { books } = useContext(BooksContext) as BooksContextTypes;
  const { users, loggedInUser } = useContext(UsersContext) as UsersContextTypes;

  const getUserById = (userId: string) => users.find((user) => user.id === userId);

  return (
    <Wrapper>
      <Title>All Books</Title>

      {books.length === 0 ? (
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
