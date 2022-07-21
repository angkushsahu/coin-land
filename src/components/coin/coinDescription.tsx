import { CryptoState } from "../../state";
import { numberWithCommas } from "../../utils";

interface CoinDescriptionProps {
	coin: any;
}

const CoinDescription = ({ coin }: CoinDescriptionProps) => {
	const { currency, symbol } = CryptoState();

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
		</aside>
	);
};

export default CoinDescription;
