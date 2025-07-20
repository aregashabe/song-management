// src/components/LoadingDots.jsx
/** @jsxImportSource @emotion/react */
import { css, keyframes } from '@emotion/react';
import styled from '@emotion/styled';

const bounce = keyframes`
  0%, 80%, 100% {
    transform: scale(0);
  }
  40% {
    transform: scale(1);
  }
`;

const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
  width: 120px;
  margin: 80px auto;
`;

const Dot = styled.div`
  width: 12px;
  height: 12px;
  background-color: #0070f3;
  border-radius: 50%;
  animation: ${bounce} 1.5s infinite ease-in-out;
  animation-delay: ${props => props.delay}s;
`;

const LoadingDots = () => {
  return (
    <LoaderContainer>
      {[...Array(16)].map((_, i) => (
        <Dot key={i} delay={i * 0.1} />
      ))}
    </LoaderContainer>
  );
};

export default LoadingDots;
