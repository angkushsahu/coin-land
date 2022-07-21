import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
} from "chart.js";
import { CryptoState } from "../../state";
import Loading from "../loading";

interface CoinGraphProps {
	id: string | undefined;
}

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const chartDays = [
	{ label: "24 Hours", value: 1 },
	{ label: "30 Days", value: 30 },
	{ label: "3 Months", value: 90 },
	{ label: "1 Year", value: 365 },
];

const CoinGraph = ({ id }: CoinGraphProps) => {
	const { currency } = CryptoState();
	const [historicalData, setHistoricalData] = useState([]);
	const [days, setDays] = useState<number>(1);

	const fetchHistoricalData = async () => {
		const res = await fetch(
			`https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=${currency}&days=${days}`,
		);
		const data = await res.json();

		setHistoricalData(previousData => data.prices);
	};

	useEffect(() => {
		fetchHistoricalData();
	}, [currency, days]);

	return (
		<div className="lg:w-[70%] lg:pl-8 flex flex-col items-center justify-center gap-6 mt-16 lg:mt-0">
			{!historicalData ? (
				<Loading />
			) : (
				<>
					<Line
						data={{
							labels: historicalData.map(coin => {
								let date = new Date(coin[0]);
								let time =
									date.getHours() > 12
										? `${date.getHours() - 12}:${date.getMinutes()} PM`
										: `${date.getHours()}:${date.getMinutes()} AM`;

								return days === 1 ? time : date.toLocaleDateString();
							}),
							datasets: [
								{
									data: historicalData.map(coin => coin[1]),
									label: `Price (Past ${days} ${
										days === 1 ? "Day" : "Days"
									}) in ${currency}`,
									borderColor: "#eebc1d",
								},
							],
						}}
						options={{
							elements: {
								point: { radius: 1 },
							},
						}}
					/>
					<div className="flex items-center justify-center flex-col sm:flex-row gap-6 sm:gap-12 w-full">
						{chartDays.map((day, idx) => (
							<button
								key={idx}
								onClick={() => setDays(previousDateValue => day.value)}
								className={`${
									day.value === days
										? "bg-yellow-500 text-[#001e3c] font-bold"
										: "text-yellow-500 font-semibold"
								} border-2 border-yellow-500 rounded px-4 py-1 w-28 transition-colors duration-200`}
							>
								{day.label}
							</button>
						))}
					</div>
				</>
			)}
		</div>
	);
};

export default CoinGraph;
