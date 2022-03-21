import React, { FC } from 'react';
import styled from 'styled-components';

const Headline: FC<{ src: any }> = ({ src, children }) => {
  return (
    <HeadlineContainer>
      <Icon src={src} /> <Title>{children}</Title>
    </HeadlineContainer>
  );
};

export default Headline;

const HeadlineContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Title = styled.div`
  padding-bottom: 18px;
`;

const Icon = styled.img`
  margin-right: 22px;
  @media (max-width: 1024px) {
    width: 63px;
  }
  @media (max-width: 640px) {
    width: 43px;
  }
`;
