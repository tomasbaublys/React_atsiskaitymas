import styled from "styled-components";

const StyledFooter = styled.footer`
    height: 200px;
    background-color: #e4cfcf21;

    display: flex;
    justify-content: center;
    align-items: center;
`;

const Footer = () => {
    return (
      <StyledFooter>
        <span>Copyright</span>
      </StyledFooter>
    );
}

export default Footer;