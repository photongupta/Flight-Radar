import styled from "styled-components";

export const Table = styled.table`
  border: 1px solid black;
  border-collapse: collapse;
  width: 75%;
  margin-left: 12%;
  margin-top: 40px;
`;

export const Row = styled.tr`
  border: 1px solid black;
  border-collapse: collapse;
  font-size: 20px;
  line-height: 40px;
  color: #12184f;
  &:hover,
  &:active {
    cursor: pointer;
    background-color: #eaecfb;
  }
`;

export const Cell = styled.td`
  &:hover,
  &:active {
    cursor: pointer;
  }
`;

export const HeaderCell = styled.td``;

export const Button = styled.button`
  background-color: ${(props) => props.color};
  border: none;
  border-radius: 8px;
  width: 80px;
  height: 20px;
  color: white;
  font-weight: 600;
`;

export const HeaderRow = styled.tr`
  font-size: 26px;
  font-weight: 700;
  color: #12184f;
  border: 1px solid black;
  border-collapse: collapse;
  line-height: 40px;
`;

export const Loader = styled.div`
  display: flex;
  justify-content: center;
  margin: 20px;
`;
