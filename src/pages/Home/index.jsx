import React from 'react';
import styled, { keyframes, createGlobalStyle } from 'styled-components';
import { FaLinkedin, FaFileAlt } from 'react-icons/fa';

// 전역 스타일 추가
const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    margin: 0;
    padding: 0;
    overflow-x: hidden;
  }
`;

// 타이핑 애니메이션 수정
const typingAnimation = keyframes`
  0%, 100% { width: 0 }
  20%, 80% { width: 100% }
`;

// 커서 깜빡임 애니메이션
const blink = keyframes`
  50% { border-color: transparent }
`;

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  background-color: #0a192f;
  color: #e6f1ff;
`;

const TitleWrapper = styled.div`
  display: inline-block;
  margin-bottom: 1rem;
`;

const Title = styled.h1`
  font-size: 3.5rem;
  font-weight: 600;
  overflow: hidden;
  white-space: nowrap;
  border-right: 3px solid #64ffda;
  width: 0;
  animation: 
    ${typingAnimation} 4s steps(14) infinite,
    ${blink} 0.7s step-end infinite;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }

  @media (max-width: 480px) {
    font-size: 2rem;
  }
`;

const Description = styled.p`
  font-size: 1.5rem;
  margin-bottom: 2rem;
  color: #8892b0;

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }

  @media (max-width: 480px) {
    font-size: 1rem;
  }
`;

const Links = styled.div`
  display: flex;
  gap: 2.5rem;
  margin-top: 2rem;

  @media (max-width: 480px) {
    gap: 2rem;
  }
`;

const IconLink = styled.a`
  color: #64ffda;
  font-size: 2rem;
  transition: all 0.3s ease;

  &:hover {
    color: #fff;
    transform: translateY(-3px);
  }

  @media (max-width: 768px) {
    font-size: 1.8rem;
  }

  @media (max-width: 480px) {
    font-size: 1.5rem;
  }
`;

const Home = () => {
  return (
    <>
      <GlobalStyle />
      <Container>
        <TitleWrapper>
          <Title>Hi, I'm Jeongwon</Title>
        </TitleWrapper>
        <Description>
          Computer Science Student & Developer
        </Description>
        <Links>
          <IconLink 
            href="https://www.linkedin.com/in/jeongwon-na-76753b18b" 
            target="_blank" 
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            <FaLinkedin />
          </IconLink>
          <IconLink 
            href="/assets/resume.pdf" 
            target="_blank" 
            rel="noopener noreferrer"
            aria-label="Resume"
          >
            <FaFileAlt />
          </IconLink>
        </Links>
      </Container>
    </>
  );
};

export default Home;