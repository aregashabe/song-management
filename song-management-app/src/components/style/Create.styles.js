// src/components/style/Create.styles.js
import { css } from '@emotion/react'

export const containerStyle = css`
  margin: 20px auto 0 auto;  /* top margin 20px, auto left and right to center */
  max-width: 400px;          /* match form width */
  position: relative;
`


export const createButtonStyle = css`
  padding: 10px 20px;
  font-size: 18px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  &:hover {
    background-color: #2980b9;
  }
`

export const formStyle = css`
  display: flex;
  flex-direction: column;
  max-width: 400px;
  padding: 20px;
  background: #f0f0f0;
  border-radius: 8px;
`

export const labelStyle = css`
  margin-bottom: 12px;
  font-weight: 600;
  color: #333;
`

export const inputStyle = css`
  padding: 8px;
  font-size: 16px;
  margin-top: 6px;
  border: 1px solid #ccc;
  border-radius: 4px;
`
