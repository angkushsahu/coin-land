import {
	createContext,
	Dispatch,
	FC,
	ReactNode,
	SetStateAction,
	useContext,
	useEffect,
	useState,
} from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { doc, onSnapshot } from "firebase/firestore";
import { auth, db } from "../firebase";

interface CryptoContextProps {
	children: ReactNode;
}

interface ContextType {
	currency: string;
	symbol: string;
	setCurrency: Dispatch<SetStateAction<string>>;
	coins: any[];
	user: User | null | undefined;
	loading: boolean;
	fetchCoins: () => Promise<void>;
	showLoginModal: boolean;
	setShowLoginModal: Dispatch<SetStateAction<boolean>>;
	showUserSideBar: boolean;
	setShowUserSideBar: Dispatch<SetStateAction<boolean>>;
	watchlist: any[];
}

const Crypto = createContext({} as ContextType);

const CryptoContext: FC<CryptoContextProps> = ({ children }) => {
	const [currency, setCurrency] = useState<string>("INR");
	const [symbol, setSymbol] = useState<string>("₹");
	const [coins, setCoins] = useState<any[]>([]);
	const [loading, setLoading] = useState<boolean>(false);
	const [user, setUser] = useState<User | null>();
	const [showLoginModal, setShowLoginModal] = useState<boolean>(false);
	const [showUserSideBar, setShowUserSideBar] = useState<boolean>(false);
	const [watchlist, setWatchlist] = useState<any[]>([]);

	const fetchCoins = async () => {
		setLoading(true);
		const res = await fetch(
			`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=100&page=1&sparkline=false`,
		);
		const data = await res.json();

		setCoins(data);
		setLoading(false);
	};

	useEffect(() => {
		if (user) {
			const coinRef = doc(db, "watchlist", user.uid);
			const unsubscribe = onSnapshot(coinRef, coin => {
				if (coin.exists()) {
					setWatchlist(coin.data().coins);
				}
			});

			return () => {
				unsubscribe();
			};
		}
	}, [user]);

	useEffect(() => {
		onAuthStateChanged(auth, (user: User | null) => {
			if (user) {
				setUser(user);
			} else {
				setUser(null);
			}
		});
	}, []);

	useEffect(() => {
		if (currency === "INR") {
			setSymbol(previousSymbol => "₹");
		}
		if (currency === "USD") {
			setSymbol(previousSymbol => "$");
		}
	}, [currency]);

	return (
		<Crypto.Provider
			value={{
				currency,
				symbol,
				setCurrency,
				coins,
				user,
				loading,
				fetchCoins,
				showLoginModal,
				setShowLoginModal,
				showUserSideBar,
				setShowUserSideBar,
				watchlist,
			}}
		>
			{children}
		</Crypto.Provider>
	);
};

export default CryptoContext;

export const CryptoState = () => {
	return useContext(Crypto);
};
