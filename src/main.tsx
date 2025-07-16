import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { CartProvider } from "./contexts/cartContext.tsx";
import { App as AntdApp } from "antd";
import { SearchProvider } from "./contexts/searchContext.tsx";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <AntdApp>
      <SearchProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </SearchProvider>
    </AntdApp>
  </BrowserRouter>
);
