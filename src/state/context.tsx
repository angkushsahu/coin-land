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

interface CryptoContextProps {
	children: ReactNode;
}

interface ContextType {
	currency: string;
	symbol: string;
	setCurrency: Dispatch<SetStateAction<string>>;
}

const Crypto = createContext({} as ContextType);

const CryptoContext: FC<CryptoContextProps> = ({ children }) => {
	const [currency, setCurrency] = useState<string>("INR");
	const [symbol, setSymbol] = useState<string>("₹");

	useEffect(() => {
		if (currency === "INR") {
			setSymbol(previousSymbol => "₹");
		}
		if (currency === "USD") {
			setSymbol(previousSymbol => "$");
		}
	}, [currency]);

	return <Crypto.Provider value={{ currency, symbol, setCurrency }}>{children}</Crypto.Provider>;
};

export default CryptoContext;

export const CryptoState = () => {
	return useContext(Crypto);
};
