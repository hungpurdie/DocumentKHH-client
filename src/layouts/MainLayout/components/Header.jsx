import { LogoutOutlined, SettingOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Badge, Button, Layout, Menu, Space, Typography } from "antd";
import { getToken, isAuthenticated } from "app/selectors/auth";
import { getProfile } from "app/selectors/profile";
import LogoHusc from "assets/images/logo/logo.svg";
import BellIcon from "components/Icons/BellIcon";
import { fetchLogout } from "features/Auth/authSlice";
import useScrollPosition from "hooks/useScrollPosition";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

const HeaderAnt = styled(Layout.Header)`
  position: ${(props) => (props.$shouldFixed ? "fixed" : "relative")};
  z-index: 10;
  width: 100%;
  transition: all 0.3s ease-in-out;
  box-shadow: ${(props) => (props.$positionY > 40 ? "rgba(0, 0, 0, 0.1) 0px 10px 50px" : "none")};
  background-color: ${(props) => (props.$positionY > 40 ? "rgba(248, 251, 250, 1)" : "#fff")};
`;
const WrapHeader = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  height: 100%;
  justify-content: space-between;
`;
const Logo = styled.div`
  display: flex;
  align-items: center;
  img {
    height: 60px;
    object-fit: contain;
  }
`;

const Title = styled.h1`
  margin-left: 10px;
  margin-bottom: 0;
`;
const MenuSubMenuAnt = styled(Menu.SubMenu)`
  & .ant-menu-submenu-title {
    height: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
  }
`;
const MenuItemAnt = styled(Menu.Item)`
  &:hover {
    background-color: #efefef;
  }
`;

const ButtonAnt = styled(Button)`
  &:focus,
  &:hover {
    background-color: transparent;
    color: #1890ff;
  }
`;
export default function Header({ shouldFixed }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const scrollPosition = useScrollPosition();

  const isAuth = useSelector(isAuthenticated);
  const refreshToken = useSelector(getToken)?.refreshToken;
  const profile = useSelector(getProfile);

  const handleLogout = () => {
    dispatch(fetchLogout(refreshToken));
  };

  return (
    <HeaderAnt theme="light" $shouldFixed={shouldFixed} $positionY={scrollPosition}>
      <WrapHeader>
        <div>
          <Link to="/">
            <Logo>
              <img src={LogoHusc} alt="logo" />
              <Title>H??? th???ng tra c???u v??n b???n ?????i h???c Khoa h???c Hu???</Title>
            </Logo>
          </Link>
        </div>
        {isAuth ? (
          <Menu
            mode="horizontal"
            style={{
              display: "flex",
              justifyContent: "flex-end",
              flexGrow: "1",
            }}
          >
            <MenuSubMenuAnt
              key="notification"
              icon={
                <Badge dot>
                  <BellIcon />
                </Badge>
              }
            >
              <MenuItemAnt key="1">
                <Link to="a">
                  <Typography.Text strong>Nguy???n V??n H??ng</Typography.Text> ???? g???i cho b???n m???t v??n
                  b???n.
                </Link>
              </MenuItemAnt>
              <MenuItemAnt key="2">
                <Link to="a">
                  <Typography.Text strong>Nguy???n Kim To??n</Typography.Text> ???? chuy???n ti???p v??n b???n
                  m?? b???n ??ang theo d??i.
                </Link>
              </MenuItemAnt>
              <MenuItemAnt key="3">
                <Link to="a">
                  <Typography.Text strong>Nguy???n V??n Linh</Typography.Text> ???? ph???n h???i v??? v??n b???n
                  m?? b???n ??ang theo d??i
                </Link>
              </MenuItemAnt>
              <MenuItemAnt key="4">
                <Link to="a">
                  <Typography.Text strong>Nguy???n L?? Th???nh</Typography.Text> ???? x??? l?? v??n b???n m?? b???n
                  ??ang theo d??i.
                </Link>
              </MenuItemAnt>
            </MenuSubMenuAnt>

            <Menu.SubMenu
              key="profile"
              icon={<Avatar>{profile.avatar}</Avatar>}
              title={<Typography.Text>{profile.username}</Typography.Text>}
            >
              <MenuItemAnt key="update-profile" icon={<SettingOutlined />}>
                <ButtonAnt type="text" onClick={() => navigate("profile")}>
                  C???p nh???t t??i kho???n
                </ButtonAnt>
              </MenuItemAnt>
              <Menu.Divider />
              <MenuItemAnt key="logout" icon={<LogoutOutlined />}>
                <ButtonAnt type="text" onClick={handleLogout}>
                  ????ng xu???t
                </ButtonAnt>
              </MenuItemAnt>
            </Menu.SubMenu>
          </Menu>
        ) : (
          <Space>
            <ButtonAnt
              type="text"
              size="large"
              icon={<UserOutlined />}
              onClick={() => navigate("login")}
            >
              T??i kho???n
            </ButtonAnt>
          </Space>
        )}
      </WrapHeader>
    </HeaderAnt>
  );
}
