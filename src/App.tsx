import { BrowserRouter, Routes, Route } from "react-router-dom";
import CoinPage from "./pages/coinPage";
import ErrorPage from "./pages/errorPage";
import HomePage from "./pages/homePage";

function App() {
	return (
		<BrowserRouter>
			<div className="min-h-screen text-white bg-[#001e3c]">
				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route path="/coins/:id" element={<CoinPage />} />
					<Route path="/*" element={<ErrorPage />} />
				</Routes>
			</div>
		</BrowserRouter>
	);
}

export default App;
