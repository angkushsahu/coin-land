import { FC } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";

const ErrorPage: FC = () => {
	const navigate: NavigateFunction = useNavigate();

	return (
		<section className="flex flex-col items-center justify-center min-h-screen p-8">
			<h1 className="text-center text-8xl smaller:text-9xl">404</h1>
			<h2 className="text-center mt-5 mb-12">
				This page either has been moved or does not exist
			</h2>
			<button
				className="border-2 border-yellow-500 text-yellow-500 font-m-semiBold rounded-md px-6 py-3 transition-colors duration-200 hover:text-[#001e3c] hover:bg-yellow-500"
				onClick={() => navigate("/", { replace: true })}
			>
				Back to home
			</button>
		</section>
	);
};

export default ErrorPage;
