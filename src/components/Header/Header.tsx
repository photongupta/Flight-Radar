import React from "react";
import { useNavigate } from "react-router-dom";
import { HeaderText, HeaderWrapper, ImgWrapper } from "./Header.style";

interface HeaderProps {
  title: string;
  imagePath: string;
}

const Header: React.FC<HeaderProps> = ({ title, imagePath }) => {
  const navigate = useNavigate();

  return (
    <HeaderWrapper>
      <ImgWrapper
        data-testid="logo"
        src={imagePath}
        onClick={() => {
          navigate(`/`);
        }}
      />
      <HeaderText data-testid="title">{title}</HeaderText>
    </HeaderWrapper>
  );
};

export default Header;
