import styled from '@emotion/styled';

export const Form = styled.form`
  width: 90vw;
  max-width: 500px;
  margin: 40px auto;
  background: #ffffff;
  border-radius: 12px;
  border: 1px solid #ccc;
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.05);
  padding: 30px 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;

  @media (min-width: 750px) {
    padding: 40px;
  }
`;

export const InputItem = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const Label = styled.label`
  font-size: 14px;
  font-weight: bold;
  color: #333;
  text-transform: uppercase;

  @media (min-width: 750px) {
    font-size: 16px;
  }
`;

export const InputText = styled.input`
  height: 45px;
  background: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 0 15px;
  font-size: 14px;

  &:focus {
    outline: none;
    border-color:  #138f3b;
    background: #fff;
  }

  @media (min-width: 750px) {
    font-size: 16px;
  }
`;

export const InputFile = styled.div`
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
`;

export const FileButton = styled.button`
  padding: 10px 20px;
  background: #f2f2f2;
  border: 1px solid #ccc;
  border-radius: 6px;
  color: #333;
  font-size: 14px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 10px;
  transition: background 0.3s, border-color 0.3s;

  &:hover {
    background-color: #e6f2ff;
    border-color:  #138f3b;
  }

  @media (min-width: 750px) {
    font-size: 16px;
  }
`;

export const Icon = styled.img`
  width: 20px;
  height: 20px;

  @media (min-width: 750px) {
    width: 25px;
    height: 25px;
  }
`;

export const SubmitButton = styled.input`
  padding: 12px 30px;
  margin-top: 10px;
  border: none;
  border-radius: 8px;
  background:  #138f3b;
  font-size: 16px;
  color: white;
  font-weight: bold;
  cursor: pointer;

  transition: background-color 0.3s ease, transform 0.2s ease;

  &:hover {
    background-color:  #138f3b;
    transform: scale(1.03);
  }
`;
