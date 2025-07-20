// Home.styles.js
import { css } from '@emotion/react'

export const containerStyle = css`
  padding: 20px;
  background-color: #f5f5f5;
  font-size: 18px;
  color: #333;

  /* Responsive styles */
  @media (max-width: 768px) {
    font-size: 16px;
    padding: 15px;
  }

  @media (max-width: 480px) {
    font-size: 14px;
    padding: 10px;
    background-color: #e0e0e0;
  }
`
