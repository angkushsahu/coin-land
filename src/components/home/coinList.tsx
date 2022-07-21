import { ChangeEvent, useEffect, useState } from "react";
import { CryptoState } from "../../state";
import CoinsTable from "./coinsTable";
import Loading from "../loading";
import PaginateCoinList from "./paginateCoinList";

const CoinList = () => {
	const { currency } = CryptoState();
	const [coins, setCoins] = useState<any[]>([]);
	const [loading, setLoading] = useState<boolean>(false);
	const [search, setSearch] = useState<string>("");
	const [page, setPage] = useState<number>(1);

	const fetchCoins = async () => {
		setLoading(true);
		const res = await fetch(
			`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=100&page=1&sparkline=false`,
		);
		const data = await res.json();

		setCoins(data);
		setLoading(false);
	};

	const handleSearch = () => {
		return coins.filter(
			coin =>
				String(coin.name).toLowerCase().includes(search) ||
				String(coin.symbol).toLowerCase().includes(search),
		);
	};

	const handlePageChange = (selectedItem: { selected: number }) => {
		setPage(previousPage => 1 + selectedItem.selected);
		console.log(page);
	};

	useEffect(() => {
		fetchCoins();
	}, [currency]);

	return (
		<section className="px-4 mt-20 pb-12">
			<input
				type="text"
				value={search}
				onChange={(e: ChangeEvent<HTMLInputElement>) =>
					setSearch(previousSearch => e.target.value)
				}
				placeholder="Search for currency"
				className="bg-transparent outline-none border-[1px] border-gray-500 rounded px-4 py-2 font-m-regular mx-auto block w-full max-w-[640px]"
			/>
			{loading ? (
				<Loading />
			) : (
				<div className="overflow-x-auto w-full">
					<CoinsTable handleSearch={handleSearch} page={page} />
				</div>
			)}
			<PaginateCoinList handleSearch={handleSearch} handlePageChange={handlePageChange} />
		</section>
	);
};

export default CoinList;
