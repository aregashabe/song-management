import styled from '@emotion/styled';
import bannerImage from '../../images/FMF-Header.jpg';



export const Main = styled.main`
  background: rgba(255, 255, 255, 0.19);
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(4.9px);
  -webkit-backdrop-filter: blur(4.9px);
  border: 1px solid rgba(255, 255, 255, 0.94);
  width: 100%;
  height: fit-content;
  position: relative;
  padding: 10px 15px;
  box-sizing: border-box;

  @media (min-width: 1200px) {
    width: 100%;
    height:85vh;
    padding: 0px 00px;
  }
`;

export const Banner = styled.div`
  background-image: url(${bannerImage});
  background-position: center ;
  background-size: cover;
  width: 100%;
  margin-top: 20px;
  height: 30vw;
  border-radius: 20px 20px 0 0px;

  @media (min-width: 750px) {
    height: 30vw;
  }

  @media (min-width: 1200px) {
   margin-top: 0px;
    height: 16vw;
  }
`;

export const Playlist = styled.h4`
  text-align: left;
  text-transform: uppercase;
  margin-top: 20px;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.4);

  @media (min-width: 750px) {
    font-size: 18px;
  }

  @media (min-width: 1200px) {
    font-size: 24px;
    margin: 20px 0 ;
    margin-left:20px;
  }
`;

export const SongList = styled.div`

  width: 100%;
  height: 40vh;
  overflow-y: scroll;
  overflow-x: hidden;
  gap: 0px;
  padding: 10px 0px;
@media (min-width: 1200px) {
    padding: 10px 20px;
  }
  .songItem {
  padding:10px;
  border-radius:10px ;
  width: 100%;
  min-height: 50px;
  height: fit-content;
  display: flex;
  justify-content: left;
  gap: 20px;
  align-items: center;
  position: relative;
  transition: background 0.3s ease-in-out;
}

.songItem:hover {
  background: #fff;
}


  .dropdown {
    display: none;
    position: absolute;
    top: calc(100% - 20px);
    right: 0;
    background-color: white;
    border: 1px solid #ccc;
    width: 100px;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    z-index: 1;
    transition: max-height 0.3s ease-out;
    max-height: 0;
    overflow: hidden;
  }

  .dropdown-item {
    padding: 10px;
    cursor: pointer;
  }

  .dropdown-item:nth-child(2) {
    background: red;
  }

  .dropdown-item:hover {
    background-color: #f1f1f1;
  }

  .thbn {
    width: 50px;
    height: 50px;
    border-radius:3px;
  }

  .content {
    cursor: pointer;
    width: 80%;
    text-align: left;
  }

  .content h3 {
    font-size: 16px;
    font-weight: normal;
    color: rgb(0, 0, 0);
  }

  .p {
    font-size: 13px;
    font-weight: normal;
    color: rgba(0, 0, 0, 0.4);
  }

  
 



  .menu {
    cursor: pointer;
    margin-left: auto;
  }

  .menu-image {
    width: 25px;
  }

  @media (min-width: 750px) {
    .songItem {
      min-height: 60px;
    }
  }

  @media (min-width: 1200px) {

  .menu-image {
    width: 35px;
  }
    .thbn {
    width: 65px;
    height: 65px;
    border-radius:5px;
  }
     .content {
     display:flex;
     flex-direction : column;
     justify-content: center;
     align-item: center;
    cursor: pointer;
    width: 98%;
    height:100%;
    text-align: left;
  }

  .content h3 {
    font-size: 20px;
  }

  .p {
    font-size: 15px;
    font-weight: normal;
    color: rgba(0, 0, 0, 0.4);
  }
  }
`;

export const LoadingOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 99;
`;

export const LoadingAnimation = styled.div`
  width: 50px;
  height: 50px;
  border: 5px solid #f3f3f3;
  border-top: 5px solid #3498db;
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;
