import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AliceCarousel from "react-alice-carousel";
import { CryptoState } from "../../state";
import "react-alice-carousel/lib/alice-carousel.css";
import { numberWithCommas } from "../../utils";
import Loading from "../loading";

const Banner = () => {
	const { currency, symbol } = CryptoState();
	const [trendingCoins, setTrendingCoins] = useState<any[]>([]);
	const [loading, setLoading] = useState<boolean>(false);

	const fetchTrendingCoins = async () => {
		setLoading(true);
		const res = await fetch(
			`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=gecko_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h`,
		);
		const data = await res.json();

		setTrendingCoins(data);
		setLoading(false);
	};

	useEffect(() => {
		fetchTrendingCoins();
	}, [currency]);

	const items = trendingCoins.map(coin => {
		const priceChange = coin.price_change_percentage_24h;
		let profit: boolean = priceChange >= 0;

		return (
			<Link to={`/coins/${coin.id}`} className="flex flex-col items-center justify-center">
				<img src={coin?.image} alt={coin?.image} className="w-14 h-14" />
				<span className="mt-4 mb-2 text-yellow-400 font-semibold text-lg">
					{String(coin?.symbol).toUpperCase()}
				</span>
				<span className={`mb-2 font-semibold ${profit ? "text-green-500" : "text-[#f00]"}`}>
					{profit && "+"} {priceChange.toFixed(2)}
				</span>

				<span>
					{symbol} {numberWithCommas(coin.current_price.toFixed(2))}
				</span>
			</Link>
		);
	});

	const responsive = {
		0: { items: 2 },
		500: { items: 3 },
		600: { items: 4 },
		900: { items: 5 },
	};

	return (
		<section className="pt-20 px-6">
			<h1 className="text-center text-5xl sm:text-7xl leading-snug">COIN LAND</h1>
			<p className="text-center mt-6 mb-28">Track your favorite crypto currency</p>
			{loading ? (
				<Loading />
			) : (
				<AliceCarousel
					mouseTrackingEnabled={true}
					infinite={true}
					autoPlayInterval={1000}
					dotsDisabled={false}
					buttonsDisabled={true}
					autoPlay={true}
					duration={1500}
					responsive={responsive}
					items={items}
				/>
			)}
		</section>
	);
};

export default Banner;
