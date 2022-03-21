import styled from 'styled-components';
import FooterBanner from 'assets/v2/footer_banner.png';

export const FooterContainer = styled.div`
  margin-top: 225px;
  position: relative;
  width: 100%;
  background: url(${FooterBanner}) center no-repeat;
  background-size: cover;
  min-height: 535px;
  display: flex;
  align-items: center;
`;

export const DiscordButton = styled.a`
  padding: 17px 27px;

  background: #e31d78;
  border-radius: 20px;
  font-style: normal;
  font-weight: bold;
  font-size: 24px;
  line-height: 28px;
  text-decoration: none;
  color: #ffffff;
  &:hover {
    filter: brightness(80%);
  }
`;
