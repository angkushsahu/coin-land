import { useState } from "react";
import Login from "./login";
import Signup from "./signup";

const LoginSignup = () => {
	const [displaySection, setDisplaySection] = useState<string>("login");

	return (
		<section className="fixed inset-0 z-10 top-[4em] px-8 py-4 bg-white/20 backdrop-blur-md flex items-center justify-center">
			<div className="bg-[#001e3c] p-6 pt-0 rounded-md w-full sm:w-[31.25em]">
				<div className="flex gap-2 sm:gap-8">
					<div
						className={`flex items-center justify-center w-1/2 py-3 cursor-pointer border-b-2 ${
							displaySection === "login"
								? "border-b-yellow-500"
								: "border-b-[#001e3c]"
						}`}
						onClick={() => setDisplaySection("login")}
					>
						<span className="font-semibold text-xl">LOGIN</span>
					</div>
					<div
						className={`flex items-center justify-center w-1/2 py-3 cursor-pointer border-b-2 ${
							displaySection === "signup"
								? "border-b-2 border-b-yellow-500"
								: "border-b-[#001e3c]"
						}`}
						onClick={() => setDisplaySection("signup")}
					>
						<span className="font-semibold text-xl">SIGNUP</span>
					</div>
				</div>
				{displaySection === "signup" && <Signup />}
				{displaySection === "login" && <Login />}
			</div>
		</section>
	);
};

export default LoginSignup;
