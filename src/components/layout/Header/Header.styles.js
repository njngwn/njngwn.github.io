import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const HomeContainer = styled.div`
  min-height: calc(100vh - 70px); // header 높이 제외
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 2rem;
`;

export const HeroSection = styled.section`
  text-align: center;
  max-width: 800px;
  margin: 0 auto;
`;

export const Title = styled.h1`
  font-size: 3rem;
  margin-bottom: 1rem;
  color: ${props => props.theme.colors.primary};
`;

export const Subtitle = styled.h2`
  font-size: 1.5rem;
  color: ${props => props.theme.colors.secondary};
  margin-bottom: 2rem;
`;

export const Description = styled.p`
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 2rem;
  color: ${props => props.theme.colors.text};
`;

export const CTAButton = styled(Link)`
  display: inline-block;
  padding: 1rem 2rem;
  background-color: ${props => props.theme.colors.primary};
  color: white;
  border-radius: 5px;
  font-weight: bold;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${props => props.theme.colors.accent};
  }
`;