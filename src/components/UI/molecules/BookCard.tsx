import { useContext } from 'react';
import styled from 'styled-components';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import { Book, User } from '../../../types';
import BooksContext from '../../../contexts/BooksContext';
import { BooksContextTypes } from '../../../types';

type Props = {
  book: Book;
  author?: User;
  loggedInUser: User | null;
};

const Card = styled.div`
  background-color: #1f1f1f;
  border: 1px solid #333;
  border-radius: 8px;
  padding: 1rem;
  color: white;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const Username = styled.span`
  font-weight: 600;
  font-size: 0.9rem;
  color: #999;
`;

const CreatedDate = styled.div`
  font-size: 0.75rem;
  color: #999;
`;

const BookImage = styled.img`
  width: 100%;
  border-radius: 5px;
  margin-bottom: 0.5rem;
`;

const BookTitle = styled.h3`
  font-size: 1.1rem;
  margin: 0 0 0.25rem 0;
  color: #f5c518;
`;

const BookDescription = styled.p`
  font-size: 0.9rem;
  color: #ccc;
  margin-bottom: 1rem;
`;

const Actions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-top: auto;

  button {
    font-size: 0.9rem;
    padding: 10px;
    border-radius: 6px;
    cursor: pointer;
    border: none;
    transition: background-color 0.2s ease-in-out;
    width: 100%;
  }

  .delete {
    background-color: #b00020;
    color: white;
    font-weight: bold;

    &:hover {
      background-color: #8b001a;
    }
  }

  .save {
    background-color: #f5c518;
    color: #1f1f1f;
    font-weight: bold;

    &:hover {
      background-color: #e4b700;
    }
  }
`;

const BookCard = ({ book, author, loggedInUser }: Props) => {
  const { removeOneBook, saveOneBook } = useContext(BooksContext) as BooksContextTypes;

  return (
    <Card>
      <div>
        <CardHeader>
          <UserInfo>
            <AccountCircleIcon style={{ fontSize: 30, color: '#999' }} />
            <Username>{author?.username || 'Unknown'}</Username>
          </UserInfo>
          <CreatedDate>{new Date(book.createdAt).toLocaleDateString()}</CreatedDate>
        </CardHeader>

        {book.image && <BookImage src={book.image} alt={book.title} />}
        <BookTitle>{book.title}</BookTitle>
        <BookDescription>{book.description}</BookDescription>
      </div>

      <Actions>
        {loggedInUser?.role === 'admin' && (
          <button className="delete" onClick={() => removeOneBook(book.id)}>
            Delete
          </button>
        )}
        {loggedInUser && (
          <button className="save" onClick={() => saveOneBook(book.id)}>
            {loggedInUser?.savedBookIds?.includes(book.id) ? 'Unsave' : 'Save'}
          </button>
        )}
      </Actions>
    </Card>
  );
};

export default BookCard;
