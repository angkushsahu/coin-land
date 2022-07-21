import { FC } from "react";
import { Banner, BaseLayout, CoinList } from "../components";

const HomePage: FC = () => {
	return (
		<BaseLayout>
			<Banner />
			<CoinList />
		</BaseLayout>
	);
};

export default HomePage;
