import { FC, useEffect, useState } from "react";
import { NavigateFunction, useNavigate, useParams } from "react-router-dom";
import { BaseLayout, CoinDescription, CoinGraph } from "../components";
import { CryptoState } from "../state";

const CoinPage: FC = () => {
	const { id } = useParams();
	const navigate: NavigateFunction = useNavigate();
	const { currency } = CryptoState();
	const [coin, setCoin] = useState({} as any);

	const fetchCoin = async () => {
		const res = await fetch(`https://api.coingecko.com/api/v3/coins/${id}`);
		const data = await res.json();

		setCoin((previousCoin: any) => data);
		if (res.status !== 200) {
			navigate("/404", { replace: true });
		}
	};

	useEffect(() => {
		fetchCoin();
	}, [currency]);

	return (
		<BaseLayout>
			<main className="py-12 px-8 flex flex-col lg:flex-row">
				<CoinDescription coin={coin} />
				<CoinGraph id={id} />
			</main>
		</BaseLayout>
	);
};

export default CoinPage;
