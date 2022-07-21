import { ReactNode } from "react";
import { CryptoState } from "../../state";
import LoginSignup from "../auth";
import UserSideBar from "../auth/userSideBar";
import Navbar from "../navbar";

interface BaseLayoutProps {
	children: ReactNode;
}

const BaseLayout = ({ children }: BaseLayoutProps) => {
	const { showLoginModal } = CryptoState();

	return (
		<>
			<Navbar />
			{showLoginModal && <LoginSignup />}
			<UserSideBar />
			{children}
		</>
	);
};

export default BaseLayout;
