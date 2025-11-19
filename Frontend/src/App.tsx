import React from "react";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { Route, Routes } from "react-router-dom";
import Nav from "./components/Nav";
import { Provider } from "react-redux";
import { store } from "./store";
import Home from "./components/Home";
import Login2 from "./components/Login";
import ActionAreaCard from "./components/Products";
import Formdata from "./xtraComponents/Formdata";
import ProductForm from "./components/ProductForm";
import Cart from "./components/Cart";

const App = () => {
  return (
    <Provider store={store}>
      <Nav />
      <div className="pt-[8vh]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login2 />} />
          <Route path="/products" element={<ActionAreaCard />} />
          <Route path="/update" element={<Formdata />} />
          <Route path="/product/create" element={<ProductForm />} />
          <Route path="/product/cart" element={<Cart />} />
        </Routes>
      </div>
      {/* <Demo/> */}
    </Provider>
  );
};

export default App;
