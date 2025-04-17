import styled from 'styled-components';

const FooterWrapper = styled.footer`
  background-color: #121212;
  color: #bbb;
  text-align: center;
  padding: 2rem 1rem;
  font-size: 0.85rem;
  margin-top: auto;
`;

const FooterLinks = styled.div`
  margin-top: 0.5rem;
  a {
    color: #bbb;
    margin: 0 0.5rem;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
`;

const Footer = () => {
  return (
    <FooterWrapper>
      <div>© {new Date().getFullYear()} Tomas • All rights reserved.</div>
      <FooterLinks>
        <a href="#">Cookies</a>
        <a href="#">Privacy Policy</a>
        <a href="#">Terms</a>
        <a href="#">Instagram</a>
        <a href="#">Facebook</a>
      </FooterLinks>
    </FooterWrapper>
  );
};

export default Footer;
