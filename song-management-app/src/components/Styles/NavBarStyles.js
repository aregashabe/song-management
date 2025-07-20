import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import star from '../../images/star.png'; 

const sparkleAnimation = keyframes`
  0%, 100% {
    opacity: 0;
    transform: translate(-50%, -50%) scale(0);
  }
  50% {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }
`;

export const NavbarContainer = styled.nav`
  width: 100vw;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 10px 15px 0 15px;
  box-sizing: border-box;

  @media (min-width: 750px) {
    width: 95vw;
    padding: 20px 45px 0 45px;
  }
  @media (min-width: 1200px) {
    width: unset;
    margin-top: 30px;
  }
`;

export const Button = styled.button`
  width: 140px;
  height: 40px;
  background-color: #1DB954; /* fresh green */
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  border-radius: 12px;
  padding: 0;
  box-sizing: border-box;
  color: #fff;
  font-size: 14px;
  font-weight: 700;
  position: relative;
  overflow: hidden;
  cursor: pointer;
  transition: box-shadow 0.3s ease-in-out, background-color 0.3s ease-in-out;

  &:hover {
    background-color: #17a44c; /* darker green */
    box-shadow: 0 0 5px #0D8BFF, 0 0 10px #0D8BFF, 0 0 20px #0D8BFF;

    &::before,
    &::after {
      content: '';
      position: absolute;
      width: 30px;
      height: 30px;
      background-image: url(${star});
      background-size: cover;
      background-repeat: no-repeat;
      opacity: 0;
      animation: ${sparkleAnimation} 0.8s infinite;
    }

    &::before {
      top: 10%;
      left: 10%;
      transform: translate(-50%, -50%);
    }

    &::after {
      top: 80%;
      left: 80%;
      transform: translate(-50%, -50%);
    }
  }

  &:active {
    background-color: #138f3b;
    box-shadow: none;
  }

  @media (min-width: 750px) {
    width: 220px;
    height: 60px;
    border-radius: 18px;
    font-size: 18px;
  }
`;

export const HomeIcon = styled.p`
  padding: 10px 20px;
  border: 2px solid transparent;
  margin-left: 10px;
  font-size: 18px;
  color:  #138f3b;
  position: relative;
  cursor: pointer;
  transition: font-size 0.3s ease, font-weight 0.3s ease, border-radius 0.3s ease;

  &:hover {
    font-size: 20px; 
    font-weight: 900; 
    border-bottom: 1px solid  #138f3b; 
  }

  @media (min-width: 750px) {
    font-size: 25px; 
    &:hover {
      font-size: 24px;
      font-weight: 900; 
      border-bottom: 2px solid  #138f3b; 
    }
  }

  @media (min-width: 1200px) {
    padding: 10px 40px;
    margin-left: 20px;

    &:hover {
      font-size: 24px; 
      font-weight: 900; 
      border-bottom: 2px solid  #138f3b; /* Add a bottom border on hover */
    }
  }
`;

export const SparkleIcon = styled.img`
  width: 30px;
  height: 30px;
  border: 0;

  @media (min-width: 750px) {
    width: 50px;
    height: 50px;
  }
`;
