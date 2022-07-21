import { doc, setDoc } from "firebase/firestore";
import { toast, ToastContainer } from "react-toastify";
import { db } from "../../firebase";
import { CryptoState } from "../../state";
import { numberWithCommas, toastOptions } from "../../utils";
import "react-toastify/dist/ReactToastify.css";

interface CoinDescriptionProps {
	coin: any;
}

const CoinDescription = ({ coin }: CoinDescriptionProps) => {
	const { currency, symbol, user, watchlist } = CryptoState();

	const alreadyInWatchList: boolean = watchlist.includes(coin?.id);

	const addToWatchList = async () => {
		const coinRef = doc(db, "watchlist", user?.uid!);

		try {
			await setDoc(coinRef, { coins: watchlist ? [...watchlist, coin?.id] : [coin?.id] });
			toast.success(`${coin?.name} is added to your watchlist`, toastOptions);
		} catch (error: any) {
			toast.success(error.message, toastOptions);
		}
	};

	const removeFromWatchList = async () => {
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
		<aside className="lg:border-r-2 lg:border-gray-700 lg:w-[30%] pr-8">
			<img src={coin?.image?.large} alt={coin?.name} className="w-52 mx-auto" />
			<h1 className="text-center my-8">{coin?.name}</h1>
			<p
				className="coin_description max-w-[60ch] text-center mx-auto leading-relaxed"
				dangerouslySetInnerHTML={{ __html: coin?.description?.en.split(". ")[0] }}
			></p>
			<h2 className="text-center my-4 mt-8">Rank: {coin?.market_cap_rank}</h2>
			<h2 className="text-center my-4">
				Current Price: {symbol}{" "}
				{numberWithCommas(coin?.market_data?.current_price[currency.toLowerCase()])}
			</h2>
			<h2 className="text-center my-4">
				Market Cap: {symbol}{" "}
				{numberWithCommas(
					coin?.market_data?.market_cap[currency.toLowerCase()].toString().slice(0, -6),
				)}{" "}
				M
			</h2>
			{user && (
				<button
					className={`font-m-semiBold rounded-sm py-2 px-4 mt-8 mx-auto block transition-colors duration-200 ${
						alreadyInWatchList
							? "text-white bg-red-600 hover:bg-red-700"
							: "text-[#001e3c] bg-yellow-500 hover:bg-yellow-600"
					}`}
					type="button"
					onClick={alreadyInWatchList ? removeFromWatchList : addToWatchList}
				>
					{alreadyInWatchList ? "Remove from Watchlist" : "Add to Watchlist"}
				</button>
			)}
			<ToastContainer />
		</aside>
	);
};

export default CoinDescription;
