import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.css";
import App from "./App";
import { CryptoContext } from "./state";
import * as serviceWorker from "./serviceWorker";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
	<React.StrictMode>
		<CryptoContext>
			<App />
		</CryptoContext>
	</React.StrictMode>,
);

serviceWorker.register();
