import styled from 'styled-components';

export const LayoutContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

export const MainContent = styled.main`
  flex: 1;
  margin-top: 70px; // Header의 높이만큼 여백
  padding: 2rem;
  max-width: 1200px;
  width: 100%;
  margin-left: auto;
  margin-right: auto;
`;