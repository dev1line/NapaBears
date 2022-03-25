import { FC, useState } from 'react';
import styled, { css } from 'styled-components';

// import Logo from 'assets/v2/logo.png';
import { Container } from 'styled-bootstrap-grid';
import { Link, NavLink } from 'react-router-dom';
import { AccountInfo } from 'pages/Stake/AccountInfo';
import { routesEnum } from 'pages/Routes';

const Navbar: FC = () => {
  const [open, setOpen] = useState(false);

  const toggleOpen = () => {
    setOpen(!open);
  };

  return (
    <NavContainer>
      <NavInner>
        <NavMain>
          <Hamburger open={open} onClick={toggleOpen} />
          <Link to="/">{/* <LogoImage src={Logo} /> */}</Link>

          <NavList open={open}>
            {/* <NavLink to={routesEnum.berries}>$BERRIES</NavLink> */}
            <NavLink to={routesEnum.stake}>Stake & Earn $BERRIES</NavLink>
            <NavbarDropdown>
              Event
              <NavbarDropdownContent>
                <NavLink to={routesEnum.heavenAndHell}>Heaven or Hell</NavLink>
              </NavbarDropdownContent>
            </NavbarDropdown>
            <a href="/">DAO Vote</a>
          </NavList>
        </NavMain>
        <AccountInfo />
      </NavInner>
    </NavContainer>
  );
};

export default Navbar;

const NavContainer = styled.nav`
  z-index: 999999;
  position: absolute;
  width: 100%;
  left: 0;
  top: 0;
  padding-top: 49px;
  @media (max-width: 650px) {
    padding-top: 12px;
  }
`;

const Hamburger = styled.div<{ open: boolean }>`
  display: none;
  position: relative;
  width: 28px;
  height: 28px;
  margin-right: 18px;
  z-index: 99999999;
  &::before {
    content: '';
    position: absolute;
    width: 28px;
    height: 4px;
    background-color: #fff;
    border-radius: 2px;
  }
  &::after {
    content: '';
    position: absolute;
    bottom: 12px;
    width: 28px;
    height: 4px;
    background-color: #fff;
    border-radius: 2px;
  }

  @media (max-width: 1240px) {
    display: block;
  }

  ${(p) =>
    p.open &&
    css`
      &::after {
        transform: rotate(45deg);
        top: 0;
      }
      &::before {
        transform: rotate(-45deg);
      }
    `}
`;

// const LogoImage = styled.img`
//   width: 60px;
//   height: 60px;
//   margin-right: 52px;
//   @media (max-width: 768px) {
//     margin-right: 0px;
//   }
// `;

const NavMain = styled.div`
  display: flex;
  align-items: center;
`;

const NavList = styled.div<{ open?: boolean }>`
  list-style: none;
  display: flex;

  & > * {
    text-decoration: none;
    margin-left: 59px;
    font-style: normal;
    font-weight: bold;
    font-size: 24px;
    line-height: 28px;
    color: #098d60;
  }

  @media (max-width: 1240px) {
    position: fixed;
    flex-direction: column;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100%;
    text-align: center;
    justify-content: center;
    align-items: center;
    background-color: #333;
    transform: ${(p) => (p.open ? 'translateX(0);' : 'translateX(100%);')};
    & > * {
      margin-left: 0;
      margin-top: 25px;
    }
    transition: all 0.5s;
  }
`;

const NavInner = styled(Container)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const NavbarDropdown = styled.div`
  position: relative;
  display: inline-block;

  &:hover {
    display: block;
    > div {
      display: block;
    }
  }
`;
const NavbarDropdownContent = styled.div`
  display: none;
  position: absolute;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0, 2);
  z-index: 1;
  min-width: 205px;
  padding-top: 35px;
  & * {
    white-space: nowrap;
    padding: 7px 24px;
    background: #098d60;
    text-decoration: none;
    font-style: normal;
    font-size: 24px;
    line-height: 28px;
    color: #fff;
    border-radius: 10px;
  }
`;
