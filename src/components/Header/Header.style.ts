import styled from "styled-components";

export const HeaderWrapper = styled.div`
  background-color: #12184f;
  width: 100%;
  justify-content: row;
  display: flex;
`;

export const HeaderText = styled.div`
  color: white;
  font-size: 40px;
  text-selft: center;
  margin-top: 25px;
  margin-left: 20px;
`;

export const ImgWrapper = styled.img`
  height: 80px;
  margin-top: 10px;
  margin-bottom: 10px;
  width: 75px;
  margin-left: 20px;
  &:hover,
  &:active {
    cursor: pointer;
  }
`;
