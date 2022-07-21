import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.css";
import App from "./App";
import { CryptoContext } from "./state";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
	<CryptoContext>
		<App />
	</CryptoContext>,
);
