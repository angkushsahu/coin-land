import { ChangeEvent } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { CryptoState } from "../state";

const Navbar = () => {
	const navigate: NavigateFunction = useNavigate();
	const { user, currency, setCurrency, setShowLoginModal, setShowUserSideBar } = CryptoState();

	return (
		<header className="py-4 shadow-2xl px-4 sm:px-12 flex items-center justify-between sticky inset-0 z-10 bg-[#001e3c]">
			<h2 className="text-yellow-500 cursor-pointer" onClick={() => navigate("/")}>
				Coin Land
			</h2>
			<div className="flex flex-col smaller:flex-row items-center justify-center gap-4 smaller:gap-8">
				<select
					name="rupee-type"
					id="rupee-type"
					title="rupee-type"
					className="bg-slate-700 px-4 py-1 rounded font-semibold outline-none cursor-pointer"
					value={currency}
					onChange={(e: ChangeEvent<HTMLSelectElement>) =>
						setCurrency(previousCurrency => e.target.value)
					}
				>
					<option value="INR">INR</option>
					<option value="USD">USD</option>
				</select>
				{user ? (
					<button
						className="font-m-semiBold rounded-sm w-full py-1 px-4 transition-colors duration-200 text-[#001e3c] bg-yellow-500 hover:bg-yellow-600"
						type="button"
						onClick={() => setShowUserSideBar(previousValue => !previousValue)}
					>
						Watchlist
					</button>
				) : (
					<button
						className="font-m-semiBold rounded-sm w-full py-1 px-4 transition-colors duration-200 text-[#001e3c] bg-yellow-500 hover:bg-yellow-600"
						type="button"
						onClick={() => setShowLoginModal(previousValue => !previousValue)}
					>
						Login
					</button>
				)}
			</div>
		</header>
	);
};

export default Navbar;
