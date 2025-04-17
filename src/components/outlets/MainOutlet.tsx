import { Outlet } from 'react-router';
import styled from 'styled-components';
import Header from '../UI/organisms/Header';
import Footer from '../UI/organisms/Footer';

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #181818;
  color: white;
  font-family: Arial, sans-serif;
`;

const Content = styled.main`
  flex: 1;
  max-width: 1100px;
  margin: 2rem auto;
  padding: 0 1rem;
`;

const MainOutlet = () => {
  return (
    <Layout>
      <Header />
      <Content>
        <Outlet />
      </Content>
      <Footer />
    </Layout>
  );
};

export default MainOutlet;
