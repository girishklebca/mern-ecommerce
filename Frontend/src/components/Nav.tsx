import React from "react";
import { Link, useLocation } from "react-router-dom";

const Nav = () => {
  const location = useLocation();
  const tabs = ["Home", "Products", "Login", "About Us", "Contact Us"];
  const routes = ["/", "/products", "/login", "/aboutus", "/contactus"];

  return (
    <div className="h-[8vh] w-full flex items-center justify-evenly bg-sky-600 fixed z-999">
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
                className={`h-full flex items-center px-6 font-medium transition-all duration-300 relative
                  ${
                    isActive
                      ? "text-sky-400 bg-white bg-opacity-10"
                      : "text-white hover:bg-white hover:bg-opacity-20 hover:text-sky-900"
                  }`}
              >
                <li className="whitespace-nowrap">{tab}</li>
                {isActive && (
                  <div className="absolute bottom-0 left-1 right-1 h-1 bg-sky-400 rounded-full px-1"></div>
                )}
              </Link>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Nav;
