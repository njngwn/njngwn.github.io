import styled from 'styled-components';

export const FooterContainer = styled.footer`
  padding: 2rem;
  background-color: ${props => props.theme.colors.background};
  border-top: 1px solid ${props => props.theme.colors.secondary}20;
`;

export const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;

  a {
    color: ${props => props.theme.colors.text};
    text-decoration: none;
    transition: color 0.3s ease;

    &:hover {
      color: ${props => props.theme.colors.primary};
    }
  }
`;