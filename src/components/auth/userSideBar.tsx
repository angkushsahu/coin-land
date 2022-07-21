import { signOut } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { toast, ToastContainer } from "react-toastify";
import { CryptoState } from "../../state";
import { auth, db } from "../../firebase";
import { numberWithCommas, toastOptions } from "../../utils";
import close from "../../assets/icons/close.svg";
import deleteIcon from "../../assets/icons/delete.svg";
import "react-toastify/dist/ReactToastify.css";

const UserSideBar = () => {
	const { coins, symbol, user, showUserSideBar, setShowUserSideBar, watchlist } = CryptoState();

	const handleLogout = () => {
		signOut(auth);
		setShowUserSideBar(false);
	};

	const removeFromWatchList = async (coin: any) => {
		const coinRef = doc(db, "watchlist", user?.uid!);

		try {
			await setDoc(
				coinRef,
				{ coins: watchlist.filter(watch => watch !== coin?.id!) },
				{ merge: true },
			);
			toast.success(`${coin?.name} is removed from your watchlist`, toastOptions);
		} catch (error: any) {
			toast.success(error.message, toastOptions);
		}
	};

	return (
		<aside
			className={`w-min fixed top-0 bottom-0 right-0 z-10 bg-[#001e3c] shadow-2xl p-8 flex flex-col items-center transition-transform origin-right ${
				showUserSideBar ? "scale-x-100" : "scale-x-0"
			}`}
		>
			<img
				src={close}
				alt="close"
				onClick={() => setShowUserSideBar(false)}
				className="w-6 h-6 invert cursor-pointer mb-10"
			/>
			<p className="font-semibold text-lg">{user?.displayName || user?.email}</p>
			<div className="overflow-y-auto min-w-[17em] my-6 px-4 h-full bg-gray-700 rounded">
				<h2 className="mt-2 p-3 bg-gray-700 sticky inset-0 text-center text-yellow-500 z-10">
					WATCHLIST
				</h2>
				{watchlist.length ? (
					coins.map((coin, idx) => {
						if (watchlist.includes(coin.id)) {
							return (
								<div
									className="bg-gray-500 rounded p-3 my-4 flex items-center justify-between"
									key={idx}
								>
									<div>
										<p className="text-yellow-300 font-semibold">
											{coin?.name}
										</p>
										<p>
											{symbol}{" "}
											{numberWithCommas(coin.current_price.toFixed(2))}
										</p>
									</div>
									<img
										src={deleteIcon}
										alt="delete"
										className="invert w-4 h-4 cursor-pointer"
										onClick={() => removeFromWatchList(coin)}
									/>
								</div>
							);
						}
					})
				) : (
					<p className="text-center">No coins are there in your watchlist</p>
				)}
			</div>
			<button
				className="border-2 border-yellow-500 text-yellow-500 font-m-semiBold rounded-md w-full py-2 transition-colors duration-200 hover:text-[#001e3c] hover:bg-yellow-500 mt-auto"
				type="button"
				onClick={handleLogout}
			>
				Logout
			</button>
			<ToastContainer />
		</aside>
	);
};

export default UserSideBar;
