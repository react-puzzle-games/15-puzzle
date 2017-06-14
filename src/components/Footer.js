import React from 'react';
import styled from 'styled-components';
import GitHubIcon from './GitHubIcon';

const FooterContent = styled.div`
  flex:none;
  background-color: rgb(232, 232, 232);
  color: rgb(0, 0, 0);
  padding-top: 10px;
  text-align: center;

  & .footerheart {
    color: #D4726A;
  }

  & .footerlink {
    text-decoration: none;
    color: #226666;
  }
`;

const Footer = () => (
  <FooterContent>
    <a
      href="https://github.com/react-puzzle-games/15-puzzle/"
      target="_blank"
      rel="noopener noreferrer"
    >
      <GitHubIcon className="menuIcon" />
    </a>
    <p>
      Made with{' '}
      <span className="footerheart">♥</span>
      {' '}by{' '}
      <a
        className="footerlink"
        href="https://github.com/react-puzzle-games"
        rel="noopener noreferrer"
        target="_blank"
      >
        {' '}React Puzzle Games
      </a>
    </p>
  </FooterContent>
);

export default Footer;
