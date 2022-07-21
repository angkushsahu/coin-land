import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Loading } from "./components";
const CoinPage = lazy(() => import("./pages/coinPage"));
const ErrorPage = lazy(() => import("./pages/errorPage"));
const HomePage = lazy(() => import("./pages/homePage"));

function App() {
	return (
		<BrowserRouter>
			<div className="min-h-screen text-white bg-[#001e3c]">
				<Suspense fallback={<Loading />}>
					<Routes>
						<Route path="/" element={<HomePage />} />
						<Route path="/coins/:id" element={<CoinPage />} />
						<Route path="/*" element={<ErrorPage />} />
					</Routes>
				</Suspense>
			</div>
		</BrowserRouter>
	);
}

export default App;
