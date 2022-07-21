import { ReactNode } from "react";
import Navbar from "../navbar";

interface BaseLayoutProps {
	children: ReactNode;
}

const BaseLayout = ({ children }: BaseLayoutProps) => {
	return (
		<>
			<Navbar />
			{children}
		</>
	);
};

export default BaseLayout;
