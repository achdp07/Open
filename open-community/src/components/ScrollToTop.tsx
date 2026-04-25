import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
}, [pathname]);

  return null;
};

export default ScrollToTop;