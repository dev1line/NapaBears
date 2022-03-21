import React, { FC } from 'react';
import styled from 'styled-components';

const Collapse: FC<{
  title: string;
  state: 'Completed' | 'Ongoing';
  open: boolean;
  toggleOpen: () => void;
}> = ({ toggleOpen, title, open, state, children }) => {
  return (
    <Wrapper open={open}>
      <Heading open={open} onClick={toggleOpen}>
        {title} <Tag>{state}</Tag>
      </Heading>
      <Content open={open}>{children}</Content>
    </Wrapper>
  );
};

export default Collapse;

const Wrapper = styled.div<{ open: boolean }>`
  width: 100%;
  background: #1e3580;
  border-radius: 20px;
  padding-left: 95px;
  padding-right: 62px;

  @media (max-width: 768px) {
    padding-left: 45px;
    padding-right: 22px;
  }

  @media (max-width: 550px) {
    padding-left: 15px;
    padding-right: 15px;
  }
`;

const Tag = styled.div`
  height: 33px;
  padding: 0px 16px;
  background: #e31d78;
  border-radius: 20px;
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  line-height: 33px;
  text-align: center;
  color: #ffffff;
  margin-left: 11px;
`;

const Heading = styled.h2<{ open: boolean }>`
  margin-bottom: 0;
  cursor: pointer;
  font-style: normal;
  font-weight: bold;
  font-size: 24px;
  line-height: 28px;
  color: #b4c4fb;
  padding-top: 25px;
  padding-bottom: ${(props) => (props.open ? '0' : '25px')};
  display: flex;
  align-items: center;
  transition: all 0.6s;
`;
const Content = styled.div<{ open: boolean }>`
  overflow: ${(props) => (props.open ? 'auto' : 'hidden')};
  opacity: ${(props) => (props.open ? '1' : '0')};
  height: ${(props) => (props.open ? '100%' : '0')};
  padding-top: ${(props) => (props.open ? '13px' : '0')};
  padding-bottom: ${(props) => (props.open ? '25px' : '0')};
  transition: all 0.7s;
`;
