import { NavigateFunction, useNavigate } from "react-router-dom";
import { CryptoState } from "../../state";
import { numberWithCommas } from "../../utils";

interface CoinsTableProps {
	handleSearch: () => any[];
	page: number;
}

const CoinsTable = ({ handleSearch, page }: CoinsTableProps) => {
	const navigate: NavigateFunction = useNavigate();
	const { symbol } = CryptoState();

	return (
		<table className="mt-12 mx-auto">
			<thead className="block w-full">
				<tr className="bg-yellow-500 text-[#001e3c] font-semibold text-lg flex items-center justify-between px-4 py-3 rounded full">
					<th className="w-48 mr-8 text-left">Coin</th>
					<th className="w-28 mr-6 text-right">Price</th>
					<th className="w-28 mr-6 text-right">24h Change</th>
					<th className="w-28  text-right">Market Cap</th>
				</tr>
			</thead>
			<tbody>
				{handleSearch()
					.slice((page - 1) * 10, (page - 1) * 10 + 10)
					.map((row: any, idx: number) => {
						const priceChange = row.price_change_percentage_24h;
						let profit: boolean = priceChange >= 0;
						return (
							<tr
								key={idx}
								onClick={() => navigate(`/coins/${row.id}`)}
								className="w-full cursor-pointer border-b-[0.0625em] border-b-gray-600 flex items-center justify-between"
							>
								<td className="flex items-center gap-3 py-6 w-48 mr-8">
									<img src={row?.image} alt={row.name} className="w-8 h-8" />
									<span>
										<p className="text-base font-semibold text-yellow-400">
											{String(row?.symbol).toUpperCase()}
										</p>
										<p className="text-sm">{row?.name}</p>
									</span>
								</td>
								<td className="w-28 mr-6 text-right">
									<span>
										{symbol} {numberWithCommas(row.current_price.toFixed(2))}
									</span>
								</td>
								<td className="w-28 mr-8 text-right">
									<span
										className={`${profit ? "text-green-500" : "text-[#f00]"}`}
									>
										{profit && "+"} {priceChange.toFixed(2)}
									</span>
								</td>
								<td className="w-28 text-right">
									<span>
										{symbol}{" "}
										{String(numberWithCommas(row.market_cap)).slice(0, -8)} M
									</span>
								</td>
							</tr>
						);
					})}
			</tbody>
		</table>
	);
};

export default CoinsTable;
