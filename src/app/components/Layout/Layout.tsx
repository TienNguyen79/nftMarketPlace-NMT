import React, { ReactNode } from 'react';
import Header from './Header/Header';
import Content from './Footer/parts/Content';
import Footer from './Footer/Footer';

export type PropsLayout = {
  children: ReactNode;
};

function Layout({ children }: PropsLayout) {
  return (
    <div className="">
      <Header />
      <div className="">{children}</div>
      <Footer />
    </div>
  );
}

export default Layout;
