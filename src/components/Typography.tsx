import styled, { css } from 'styled-components';

export const Typography = styled.p<{
  color?: string;
  fontSize?: number;
  lineHeight?: number;
  fontWeight?: any;
  align?: 'center' | 'left' | 'justify';
  mt?: number;
  mb?: number;
  mdFontSize?: number;
  mdLineHeight?: number;
  xsFontSize?: number;
  xsLineHeight?: number;
}>`
  font-style: normal;
  font-weight: ${(p) => `${p.fontWeight || 'normal'}`};
  font-size: ${(p) => `${p.fontSize || 18}px`};
  line-height: ${(p) => `${p.lineHeight || 21}px`};
  text-align: ${(p) => `${p.align || 'left'}`};
  color: ${(p) => `${p.color || '#fff'}`};

  ${(p) =>
    p.mt &&
    css`
      margin-top: ${p.mt}px;
    `}

  ${(p) =>
    p.mb &&
    css`
      margin-bottom: ${p.mb}px;
    `}
  @media (max-width:1024px) {
    font-size: ${(p) => `${p.mdFontSize || p.fontSize || 18}px`};
    line-height: ${(p) => `${p.mdLineHeight || p.lineHeight || 21}px`};
  }
  @media (max-width: 640px) {
    font-size: ${(p) => `${p.xsFontSize || p.mdFontSize || p.fontSize || 18}px`};
    line-height: ${(p) => `${p.xsLineHeight || p.mdLineHeight || p.lineHeight || 21}px`};
  }
`;

export const TypographySpan = styled.span<{
  color?: string;
  fontSize?: number;
  fontWeight?: any;
  align?: 'center' | 'left' | 'justify';
  lineHeight?: number;
  mt?: number;
  mb?: number;
  mdFontSize?: number;
  mdLineHeight?: number;
  xsFontSize?: number;
  xsLineHeight?: number;
}>`
  font-style: normal;
  font-weight: ${(p) => `${p.fontWeight || 'normal'}`};
  font-size: ${(p) => `${p.fontSize || 18}px`};
  line-height: ${(p) => `${p.lineHeight || 21}px`};
  text-align: ${(p) => `${p.align || 'left'}`};
  color: ${(p) => `${p.color || '#fff'}`};

  ${(p) =>
    p.mt &&
    css`
      margin-top: ${p.mt}px;
    `}

  ${(p) =>
    p.mb &&
    css`
      margin-bottom: ${p.mb}px;
    `}
  @media (max-width:1024px) {
    font-size: ${(p) => `${p.mdFontSize || p.fontSize || 18}px`};
    line-height: ${(p) => `${p.mdLineHeight || p.lineHeight || 21}px`};
  }
  @media (max-width: 640px) {
    font-size: ${(p) => `${p.xsFontSize || p.mdFontSize || p.fontSize || 18}px`};
    line-height: ${(p) => `${p.xsLineHeight || p.mdLineHeight || p.lineHeight || 21}px`};
  }
`;
