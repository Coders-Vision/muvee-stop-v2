import React, { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";
type Props = {
  children: ReactNode;
  headerClasses?: string;
  footerClasses?: string;
};
function index({ children, headerClasses }: Props) {
  return (
    <>
      <Header styleClass={headerClasses} />
      <main>{children}</main>
      <Footer  />
    </>
  );
}

export default index;
