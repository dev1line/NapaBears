import styled from 'styled-components';

export const Typography = styled.p<{ fontSize?: number; color?: string; align?: string }>`
  font-size: ${({ fontSize }) => fontSize || 14}px;
  color: ${({ color }) => color || 'white'};
  line-height: 20px;
  text-align: ${({ align }) => align || 'left'};
  font-family: 'Roboto Mono';
`;
