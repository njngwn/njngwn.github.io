import React from 'react';
import {
  HomeContainer,
  HeroSection,
  Title,
  Subtitle,
  Description,
  CTAButton
} from './Home.styles';

const Home = () => {
  return (
    <HomeContainer>
      <HeroSection>
        <Title>안녕하세요, 저는 [이름]입니다</Title>
        <Subtitle>Frontend Developer & UI/UX Designer</Subtitle>
        <Description>
          컴퓨터 사이언스를 공부하고 있는 개발자입니다.
          사용자 경험을 중요하게 생각하며, 
          UI/UX 디자인과 프론트엔드 개발을 함께 공부하고 있습니다.
        </Description>
        <CTAButton to="/projects">프로젝트 보기</CTAButton>
      </HeroSection>
    </HomeContainer>
  );
};

export default Home;
