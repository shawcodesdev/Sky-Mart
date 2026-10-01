import { createRoot } from "react-dom/client";
import { Analytics } from "@vercel/analytics/react";
import "./index.css";
import { BrowserRouter } from "react-router";
import App from "./App.jsx";
import { MyStoreProvider } from "./context/ShopContext.jsx";

createRoot(document.getElementById("root")).render(
  <MyStoreProvider>
    <BrowserRouter>
      <App />
      <Analytics />
    </BrowserRouter>
  </MyStoreProvider>,
);
