/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

export const container = css`
  display: flex;
  max-width: 800px;
  margin: 20px auto;
  gap: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    max-width: 95%;
    margin: 10px auto;
  }
`;

export const songListContainer = css`
  flex: 1;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 10px;
  max-height: 400px;
  overflow-y: auto;

  @media (max-width: 768px) {
    max-height: 300px;
  }

  @media (max-width: 480px) {
    max-height: 250px;
  }
`;

export const songList = css`
  list-style: none;
  padding: 0;
  margin: 0;
`;

export const songItem = (active) => css`
  cursor: pointer;
  padding: 8px;
  margin-bottom: 6px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 4px;
  transition: background-color 0.3s;
  background-color: ${active ? '#3498db' : 'transparent'};
  color: ${active ? 'white' : 'black'};

  @media (max-width: 480px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 6px;
  }
`;

export const albumArt = css`
  width: 50px;
  height: 50px;
  border-radius: 4px;
  margin-right: 10px;

  @media (max-width: 480px) {
    width: 40px;
    height: 40px;
    margin-right: 0;
  }
`;

export const songInfo = css`
  flex: 1;

  @media (max-width: 480px) {
    font-size: 14px;
  }
`;

export const actionButtons = css`
  display: flex;
  gap: 10px;

  @media (max-width: 480px) {
    gap: 8px;
  }
`;

export const player = css`
  flex: 1;
  text-align: center;

  @media (max-width: 768px) {
    margin-top: 20px;
  }
`;

export const audioPlayer = css`
  width: 100%;
`;

export const navButtons = css`
  margin-top: 20px;
  button {
    padding: 8px 12px;
    font-size: 14px;
  }

  @media (max-width: 480px) {
    button {
      padding: 6px 10px;
      font-size: 12px;
    }
  }
`;
