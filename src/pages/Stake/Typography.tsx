import styled from 'styled-components';

export const Typography = styled.p<{
  fontSize?: number;
  color?: string;
  align?: string;
  strong?: boolean;
  margin?: string;
  lineHeight?: string;
}>`
  font-size: ${({ fontSize }) => fontSize || 14}px;
  color: ${({ color }) => color || 'white'};
  line-height: ${({ lineHeight }) => lineHeight || '20px'};
  text-align: ${({ align }) => align || 'left'};
  font-family: 'Roboto';
  font-weight: ${({ strong }) => strong && 'bold'};
  margin: ${({ margin }) => margin};
`;
