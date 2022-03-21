import { FC } from 'react';
import Footer from './Footer';

import Navbar from './Navbar';

const Layout: FC = ({ children }) => {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
