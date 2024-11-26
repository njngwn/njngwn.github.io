import React from 'react';
import { FooterContainer, FooterContent, SocialLinks } from './Footer.styles';

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <p>&copy; 2024 Your Name. All rights reserved.</p>
        <SocialLinks>
          <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          <a href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
        </SocialLinks>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer;