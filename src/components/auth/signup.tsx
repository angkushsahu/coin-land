import { ChangeEvent, FormEvent, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import GoogleButton from "react-google-button";
import { toastOptions, validateEmail } from "../../utils";
import { auth } from "../../firebase";
import "react-toastify/dist/ReactToastify.css";
import { CryptoState } from "../../state";

const Signup = () => {
	const { setShowLoginModal } = CryptoState();
	const [signupValues, setSignupValues] = useState({
		email: "",
		password: "",
		confirmPassword: "",
	});

	const handleSignupValueChange = (e: ChangeEvent<HTMLInputElement>) => {
		setSignupValues(previousValues => {
			return { ...previousValues, [e.target.name]: e.target.value };
		});
	};

	const handleSignupSubmit = async (e: FormEvent) => {
		e.preventDefault();

		if (!signupValues.email || !signupValues.password || !signupValues.confirmPassword) {
			toast.error("Please fill in all the fields", toastOptions);
			return;
		}

		if (!validateEmail(signupValues.email)) {
			toast.error("Please enter a valid e-mail", toastOptions);
			return;
		}

		if (signupValues.password !== signupValues.confirmPassword) {
			toast.error("Password fields not matching", toastOptions);
			return;
		}

		try {
			const result = await createUserWithEmailAndPassword(
				auth,
				signupValues.email,
				signupValues.password,
			);

			setShowLoginModal(false);
			toast.success("Sign up successfull", toastOptions);
		} catch (error: any) {
			toast.error(error.message, toastOptions);
		}
	};

	const googleProvider = new GoogleAuthProvider();

	const signInWithGoole = async () => {
		try {
			const result = await signInWithPopup(auth, googleProvider);
			toast.success("Login Successful", toastOptions);
			setShowLoginModal(false);
		} catch (error: any) {
			toast.error("Some error occurred, please try again later", toastOptions);
		}
	};

	return (
		<form onSubmit={handleSignupSubmit}>
			<h2 className="text-center my-4">Signup</h2>
			<div className="flex flex-col gap-4">
				<input
					type="email"
					name="email"
					id="email"
					value={signupValues.email}
					onChange={handleSignupValueChange}
					className="outline-none w-full bg-transparent text-base border-[0.0625em] border-gray-700 py-2 px-4 rounded"
					placeholder="E - mail"
				/>
				<input
					type="password"
					name="password"
					id="password"
					value={signupValues.password}
					onChange={handleSignupValueChange}
					className="outline-none w-full bg-transparent text-base border-[0.0625em] border-gray-700 py-2 px-4 rounded"
					placeholder="Password"
				/>
				<input
					type="password"
					name="confirmPassword"
					id="confirmPassword"
					value={signupValues.confirmPassword}
					onChange={handleSignupValueChange}
					className="outline-none w-full bg-transparent text-base border-[0.0625em] border-gray-700 py-2 px-4 rounded"
					placeholder="Confirm Password"
				/>
			</div>
			<button
				className="mt-8 font-m-semiBold rounded-md w-full py-2 transition-colors duration-200 text-[#001e3c] bg-yellow-500 hover:bg-yellow-600"
				type="submit"
			>
				Signup
			</button>
			<p className="text-gray-300 my-4 text-center">OR</p>
			<GoogleButton type="dark" style={{ width: "100%" }} onClick={signInWithGoole} />
			<ToastContainer />
			<ToastContainer />
		</form>
	);
};

export default Signup;
