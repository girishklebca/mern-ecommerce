import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const Nav = () => {
  const location = useLocation();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const tabs = ["Home", "Products", "Login", "About Us", "Contact Us"];
  const routes = ["/", "/products", "/login", "/aboutus", "/contactus"];

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < 10) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  return (
    <div
      className={`h-[8vh] w-full flex items-center justify-evenly bg-sky-600 fixed z-[999] transition-transform duration-300 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="container w-[100px] text-white font-bold text-lg">
        <Link to="/">LOGO</Link>
      </div>

      <div className="tabs h-full">
        <ul className="flex justify-center items-center h-full">
          {tabs.map((tab, idx) => {
            const isActive = location.pathname === routes[idx];
            return (
              <Link
                key={idx}
                to={routes[idx]}
                className={`h-full flex items-center justify-center w-24 font-medium transition-all duration-300  relative
                  ${
                    isActive
                      ? "text-sky-400 bg-white bg-opacity-10"
                      : "text-white hover:bg-white hover:bg-opacity-20 hover:text-sky-900"
                  }`}
              >
                <li className="whitespace-nowrap">{tab}</li>
              </Link>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Nav;
