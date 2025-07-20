import styled from '@emotion/styled';

export const PlayerSection = styled.section`



  display: flex;
  flex-direction: column;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding-bottom: 20px;
  justify-content: center;
  align-items: center;

background: linear-gradient(145deg, rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.1)), rgba(0, 180, 216, 0.42);
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(3.7px);
  -webkit-backdrop-filter: blur(3.7px);
  border: 1px solid rgba(255, 255, 255, 1);

  @media (min-width: 750px) {
    width: 100%;
  }
  @media (min-width: 1200px) {
    width: 100%;
    height:85vh;
  }
`;

export const PlayerMain = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  width: 100%;

  @media (min-width: 750px) {
    flex-direction: row;
    justify-content: center;
  }
  @media (min-width: 1200px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;

export const AlbumCover = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 5px;

  @media (min-width: 1200px) {
    width: 200px;
    height: 200px;
    margin-bottom: 30px;
  }
`;

export const PlayerInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

export const SongTitle = styled.h3`
  text-align: left;
  font-size: 18px;
  margin: 0;

  @media (min-width: 1200px) {
    text-align: center;
    font-size: 38px;
  }
`;

export const SongDetails = styled.p`
  text-align: left;
  font-size: 10px;
  color: #666;

  @media (min-width: 1200px) {
    text-align: center;
    font-size: 18px;
  }
`;

export const PlayerProgress = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin-top: 10px;

  @media (min-width: 750px) {
    width: 70%;
    margin: 0 auto;
    margin-top: 20px;
  }
  @media (min-width: 1200px) {
    width: 60%;
    margin: 0 auto;
    margin-top: 20px;
  }
`;

export const Time = styled.span`
  font-size: 12px;
  color: #666;
  margin: 0 5px;

  @media (min-width: 1200px) {
    font-size: 16px;
  }
`;

export const ProgressBar = styled.input`
cursor:pointer;
  flex: 1;
  margin: 0 10px;
  -webkit-appearance: none;
  appearance: none;
  height: 5px;
  background: ${({ value }) =>
    `linear-gradient(to right, #00b4d8 ${value}%, #023e8a ${value}%)`};
  border-radius: 5px;
  outline: none;

  @media (min-width: 1200px) {
    height: 6px;
  }
`;

export const Thumb = styled.div`
  -webkit-appearance: none;
  appearance: none;
  width: 12px;
  height: 12px;
  background: #333;
  border-radius: 50%;
  cursor: pointer;

  @media (min-width: 1200px) {
    width: 16px;
    height: 16px;
  }
`;

export const PlayerControls = styled.div`
  display: flex;
  gap: 25px;
  justify-content: center;
  width: 100%;
  margin-top: 10px;
  margin-bottom: 20px;

  @media (min-width: 750px) {
    margin: 0 auto;
    width: 70%;
    margin-top: 20px;
    gap: 40px;
  }
  @media (min-width: 1200px) {
    margin: 0 auto;
    margin-top: 20px;
    gap: 50px;
  }
`;

export const ControlButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  font-size: 18px;
  img {
    width: 25px; /* Adjust this value as needed */
    height: 25px; /* Adjust this value as needed */
  }
  @media (min-width: 750px) {
    img {
      width: 35px; /* Adjust this value as needed */
      height: 35px; /* Adjust this value as needed */
    }
  }
  @media (min-width: 1200px) {
    font-size: 24px;
    img {
      width: 45px; 
      height: 45px; 
    }
  }
`;

export const PlayButton = styled(ControlButton)`
  background-color: #16425b;
  border-radius: 50%;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 35px;
  height: 35px;
  img {
    width: 18px; 
    height: 18px; 
  }
  @media (min-width: 750px) {
    padding: 15px 25px;
    font-size: 18px;
    width: 50px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  @media (min-width: 1200px) {
    padding: 15px 25px;
    font-size: 24px;
    width: 70px;
    height: 70px;
    img {
      width: 35px; 
      height: 35px; 
    }
  }
`;