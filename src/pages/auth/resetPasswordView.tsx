import { Card, Input, Button, Typography } from "@material-tailwind/react";
import { firebaseResetPassword } from "../../utils/firebase";
import { useState } from "react";

const ResetPasswordView = () => {
	const [email, setEmail] = useState("");

	const handleResetPassword = async () => {
		await firebaseResetPassword({ email });
	};

	return (
		<div className="flex items-center h-screen justify-center">
			<Card className="p-5">
				<Typography variant="h4" color="blue-gray">
					Reset Password
				</Typography>
				<Typography color="gray" className="mt-1 font-normal">
					masukan email
				</Typography>
				<form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
					<div className="mb-4 flex flex-col gap-6">
						<Input
							size="lg"
							label="Email"
							type="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
					</div>

					<Button className="mt-6" fullWidth onClick={handleResetPassword}>
						Kirim
					</Button>
				</form>
			</Card>
		</div>
	);
};

export default ResetPasswordView;
