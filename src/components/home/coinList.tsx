import { ChangeEvent, useEffect, useState } from "react";
import { CryptoState } from "../../state";
import CoinsTable from "./coinsTable";
import Loading from "../loading";
import PaginateCoinList from "./paginateCoinList";

const CoinList = () => {
	const { currency, coins, loading, fetchCoins } = CryptoState();
	const [search, setSearch] = useState<string>("");
	const [page, setPage] = useState<number>(1);

	const handleSearch = () => {
		return coins.filter(
			coin =>
				String(coin.name).toLowerCase().includes(search) ||
				String(coin.symbol).toLowerCase().includes(search),
		);
	};

	const handlePageChange = (selectedItem: { selected: number }) => {
		setPage(previousPage => 1 + selectedItem.selected);
		document.getElementById("coins-table")?.scrollIntoView({ behavior: "smooth" });
	};

	useEffect(() => {
		fetchCoins();
	}, [currency]);

	return (
		<section id="coins-table" className="px-4 mt-20 pb-12">
			<input
				type="text"
				value={search}
				onChange={(e: ChangeEvent<HTMLInputElement>) =>
					setSearch(previousSearch => e.target.value)
				}
				placeholder="Search for currency"
				className="bg-transparent outline-none border-[0.0625em] border-gray-500 rounded px-4 py-2 font-m-regular mx-auto block w-full max-w-[40em]"
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
