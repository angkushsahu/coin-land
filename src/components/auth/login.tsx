import { ChangeEvent, FormEvent, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import GoogleButton from "react-google-button";
import { toastOptions, validateEmail } from "../../utils";
import { CryptoState } from "../../state";
import { auth } from "../../firebase";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
	const { setShowLoginModal } = CryptoState();
	const [loginValues, setLoginValues] = useState({ email: "", password: "" });

	const handleLoginValueChange = (e: ChangeEvent<HTMLInputElement>) => {
		setLoginValues(previousValues => {
			return { ...loginValues, [e.target.name]: e.target.value };
		});
	};

	const handleLoginSubmit = async (e: FormEvent) => {
		e.preventDefault();

		if (!loginValues.email || !loginValues.password) {
			toast.error("Please fill in all the fields", toastOptions);
			return;
		}

		if (!validateEmail(loginValues.email)) {
			toast.error("Please enter a valid e-mail", toastOptions);
			return;
		}

		try {
			const result = await signInWithEmailAndPassword(
				auth,
				loginValues.email,
				loginValues.password,
			);

			setShowLoginModal(false);
			toast.success("Login successfull", toastOptions);
		} catch (error: any) {
			toast.error(error.message, toastOptions);
		}
	};

	const googleProvider = new GoogleAuthProvider();

	const signInWithGoole = async () => {
		// try {
		const result = await signInWithPopup(auth, googleProvider);
		console.log(result);
		toast.success("Login Successful", toastOptions);
		setShowLoginModal(false);
		// } catch (error: any) {
		// toast.error("Some error occurred, please try again later", toastOptions);
		// }
	};

	return (
		<form onSubmit={handleLoginSubmit}>
			<h2 className="text-center my-4">Login</h2>
			<div className="flex flex-col gap-4">
				<input
					type="email"
					name="email"
					id="email"
					value={loginValues.email}
					onChange={handleLoginValueChange}
					className="outline-none w-full bg-transparent text-base border-[0.0625em] border-gray-700 py-2 px-4 rounded"
					placeholder="E - mail"
				/>
				<input
					type="password"
					name="password"
					id="password"
					value={loginValues.password}
					onChange={handleLoginValueChange}
					className="outline-none w-full bg-transparent text-base border-[0.0625em] border-gray-700 py-2 px-4 rounded"
					placeholder="Password"
				/>
			</div>
			<button
				className="mt-8 font-m-semiBold rounded-md w-full py-2 transition-colors duration-200 text-[#001e3c] bg-yellow-500 hover:bg-yellow-600"
				type="submit"
			>
				Login
			</button>
			<p className="text-gray-300 my-4 text-center">OR</p>
			<GoogleButton type="dark" style={{ width: "100%" }} onClick={signInWithGoole} />
			<ToastContainer />
		</form>
	);
};

export default Login;
