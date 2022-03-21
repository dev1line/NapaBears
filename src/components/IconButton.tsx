import styled from 'styled-components';

export const IconButton = styled.button`
  all: unset;
  cursor: pointer;
  width: 55px;
  height: 55px;
  border-radius: 50%;
  & path {
    fill: #d0efd1;
  }
  &:hover path {
    fill: #bed889;
  }
`;
