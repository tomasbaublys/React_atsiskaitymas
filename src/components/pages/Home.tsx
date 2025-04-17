import styled from 'styled-components';

const Wrapper = styled.main`
  max-width: 1000px;
  margin: 0 auto;
  padding: 2rem 1rem;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 1rem;
`;

const Message = styled.p`
  font-size: 1rem;
  color: #777;
`;

const Home = () => {
  return (
    <Wrapper>
      <Title>All Books</Title>
      <Message>Book list will appear here.</Message>
    </Wrapper>
  );
};

export default Home;
