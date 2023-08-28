import {
	Card,
	Input,
	Button,
	Typography,
	CardHeader,
	CardBody,
	CardFooter,
} from "@material-tailwind/react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../configs/firebase.config";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IAppContextModel, useAppContext } from "../../context/app.context";

export default function LoginView() {
	const { setIsLoading }: IAppContextModel = useAppContext();
	const navigate = useNavigate();

	const [userEmail, setUserEmail] = useState("");
	const [userPassword, setUserPassword] = useState("");

	const handleSubmit = async () => {
		setIsLoading(true);
		try {
			await signInWithEmailAndPassword(auth, userEmail, userPassword);
			navigate("/");
		} catch (error: any) {
			console.log(error);
			const errorCode = error.code;
			const errorMessage = error.message;
		}
		setIsLoading(false);
	};

	return (
		<div className="flex items-center h-screen justify-center">
			<Card className="w-96">
				<CardHeader
					variant="gradient"
					color="blue"
					className="mb-4 grid h-28 place-items-center"
				>
					<Typography variant="h3" color="white">
						Login
					</Typography>
				</CardHeader>
				<CardBody className="flex flex-col gap-4">
					<Input
						label="Email"
						type="email"
						size="lg"
						value={userEmail}
						onChange={(e) => setUserEmail(e.target.value)}
					/>
					<Input
						label="Password"
						type="password"
						size="lg"
						value={userPassword}
						onChange={(e) => setUserPassword(e.target.value)}
					/>
					{/* <Typography variant="small" className="flex justify-center">
						lupa password?
						<Link to={"/reset-password"}>
							<Typography variant="small" color="blue" className="ml-1">
								reset password
							</Typography>
						</Link>
					</Typography> */}
				</CardBody>
				<CardFooter className="pt-0">
					<Button variant="gradient" fullWidth onClick={handleSubmit}>
						Login
					</Button>
					<Typography variant="small" className="mt-6 flex justify-center">
						Belum punya account?
						<Link to={"/sign-up"}>
							<Typography
								variant="small"
								color="blue"
								className="ml-1 font-bold"
							>
								Sign In
							</Typography>
						</Link>
					</Typography>
				</CardFooter>
			</Card>
		</div>
	);
}
