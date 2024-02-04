import Footer from "../components/Footer";
import Header from "./../components/Header";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import * as Yup from "yup"; // Import Yup for validation
import { useFormik } from "formik"; // Import useFormik for form handling
import { auth } from "../config/firebase";
import {
	createUserWithEmailAndPassword,
	sendEmailVerification,
} from "firebase/auth";

function SignUp() {
	const [user, setUser] = useState(null);

	const navigate = useNavigate();

	const formik = useFormik({
		initialValues: {
			email: "",
			password: "",
			confirmPassword: "",
		},
		validationSchema: Yup.object({
			email: Yup.string().email().required(),
			password: Yup.string().required("Password is required").min(8),
			confirmPassword: Yup.string()
				.oneOf([Yup.ref("password"), null], "Passwords must match")
				.required("Confirm password is required"),
		}),
		onSubmit: async (values, { setSubmitting }) => {
			try {
				await createUserWithEmailAndPassword(
					auth,
					values.email,
					values.password
				);
				navigate("/sign-in");
			} catch (error) {
				console.error("Registration error: ", error.message);
			} finally {
				setSubmitting(false);
			}
		},
		validateOnChange: false,
		validateOnBlur: false,
	});

	return (
		<div className="flex-box flex-col">
			<Header />
			<div className="text-center text-white w-full py-10 flex-box flex-col scroll-smooth gradient-form h-full bg-slate-800">
				<div className="container h-full p-10">
					<div className="g-6 flex h-full flex-wrap items-center justify-center text-neutral-800 dark:text-neutral-200">
						<div className="w-full">
							<div className="block rounded-lg bg-white shadow-lg dark:bg-neutral-800">
								<div className="g-0 lg:flex lg:flex-wrap flex-row-reverse">
									<div className="px-4 md:px-0 lg:w-6/12">
										<div className="md:mx-6 md:p-12">
											<div className="text-center">
												<img
													className="mx-auto pt-5 w-20 h-20"
													src="logo.png"
													alt="logo"
												/>
												<h4 className="mb-12 mt-1 pb-1 text-xl font-semibold">
													<span className="text-white text-3xl font-bold">
														Teeth
													</span>
													<span className="text-white text-3xl font-light">
														Seg
													</span>
												</h4>
											</div>
											{/* registration form starts here */}
											<form
												onSubmit={formik.handleSubmit}
											>
												<div>
													<p className="mb-4">
														Create an account to get
														in the door
													</p>
													<div
														className="relative mb-4"
														data-te-input-wrapper-init
													>
														<input
															type="text"
															className={`${
																formik.errors
																	.email
																	? "border-red-500 border-2 bg-white dark:border-red-500 text-sm rounded-lg focus:ring-primary dark:bg-gray-700 dark:text-neutral-200 dark:placeholder-neutral-400 dark:focus:ring-primary dark:border-primary block w-full p-2.5"
																	: "bg-white border border-neutral-300 dark:border-neutral-700 text-sm rounded-lg focus:ring-primary dark:bg-gray-700 dark:text-neutral-200 dark:placeholder-neutral-400 dark:focus:ring-primary dark:border-primary block w-full p-2.5"
															}`}
															id="email"
															placeholder="Email"
															value={
																formik.values
																	.email
															}
															onChange={
																formik.handleChange
															}
															onBlur={
																formik.handleBlur
															}
														/>
														{/* Display validation error */}
														{formik.touched.email &&
															formik.errors
																.email && (
																<p className="mt-2 text-sm text-red-500 dark:text-red-500">
																	{
																		formik
																			.errors
																			.email
																	}
																</p>
															)}
													</div>

													<div
														className="relative mb-4"
														data-te-input-wrapper-init
													>
														<input
															type="password"
															className={`${
																formik.errors
																	.password
																	? "border-red-500 border-2 bg-white dark:border-red-500 text-sm rounded-lg focus:ring-primary dark:bg-gray-700 dark:text-neutral-200 dark:placeholder-neutral-400 dark:focus:ring-primary dark:border-primary block w-full p-2.5"
																	: "bg-white border border-neutral-300 dark:border-neutral-700 text-sm rounded-lg focus:ring-primary dark:bg-gray-700 dark:text-neutral-200 dark:placeholder-neutral-400 dark:focus:ring-primary dark:border-primary block w-full p-2.5"
															}`}
															id="password"
															placeholder="Password"
															value={
																formik.values
																	.password
															}
															onChange={
																formik.handleChange
															}
															onBlur={
																formik.handleBlur
															}
														/>
														{/* Display validation error */}
														{formik.touched
															.password &&
															formik.errors
																.password && (
																<p className="mt-2 text-sm text-red-500 dark:text-red-500">
																	{
																		formik
																			.errors
																			.password
																	}
																</p>
															)}
													</div>

													<div
														className="relative mb-4"
														data-te-input-wrapper-init
													>
														<input
															type="password"
															className={`${
																formik.errors
																	.confirmPassword
																	? "border-red-500 border-2 bg-white dark:border-red-500 text-sm rounded-lg focus:ring-primary dark:bg-gray-700 dark:text-neutral-200 dark:placeholder-neutral-400 dark:focus:ring-primary dark:border-primary block w-full p-2.5"
																	: "bg-white border border-neutral-300 dark:border-neutral-700 text-sm rounded-lg focus:ring-primary dark:bg-gray-700 dark:text-neutral-200 dark:placeholder-neutral-400 dark:focus:ring-primary dark:border-primary block w-full p-2.5"
															}`}
															id="confirmPassword"
															placeholder="Confirm Password"
															value={
																formik.values
																	.confirmPassword
															}
															onChange={
																formik.handleChange
															}
															onBlur={
																formik.handleBlur
															}
														/>
														{/* Display validation error */}
														{formik.touched
															.confirmPassword &&
															formik.errors
																.confirmPassword && (
																<p className="mt-2 text-sm text-red-500 dark:text-red-500">
																	{
																		formik
																			.errors
																			.confirmPassword
																	}
																</p>
															)}
													</div>

													<div className="mb-12 pb-1 pt-1 text-center">
														<button
															className="mb-3 inline-block w-full rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] bg-gradient-to-r from-[#ee7724] to-[#b44593]"
															type="submit"
															data-te-ripple-init
															data-te-ripple-color="light"
															disabled={
																formik.isSubmitting
															}
														>
															Register
														</button>
													</div>

													<div className="flex justify-end pb-6">
														<Link
															to="/sign-in"
															className="mb-0 mr-2 hover:underline text-neutral-500 transition duration-150 ease-in-out hover:text-neutral-700 dark:hover:text-neutral-200"
														>
															Already have an
															account?
														</Link>
													</div>
												</div>
											</form>
											{/* registration form end here */}
										</div>
									</div>

									<div className="flex-box rounded-b-lg lg:w-6/12 lg:rounded-r-lg lg:rounded-bl-none bg-gradient-to-r from-[#ee7724] to-[#b44593]">
										<div className="flex-box flex-col px-4 py-6 text-white md:mx-6 md:p-12">
											<h4 className="mb-6 text-xl font-semibold">
												We are more than just Employees
											</h4>
											<p className="text-sm">
												We Are Interns
											</p>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<Footer />
		</div>
	);
}

export default SignUp;
