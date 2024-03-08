import { useAuth } from "@clerk/nextjs";
import { Input } from "@nextui-org/react";
import WithLoading from "@venedicto/ui-library/dist/components/WithLoading";
import Link from "next/link";
import React, { useEffect } from "react";
import { AiOutlineLogout } from "react-icons/ai";
import { IoMdArrowBack } from "react-icons/io";
import { api } from "~/utils/api";

export default function settings() {
	const { signOut } = useAuth();
	const config = api.api.getConfig.useQuery();
	const changePoint = api.api.saveConfig.useMutation();
	const [point, setPoint] = React.useState(20);
	const [change, setChange] = React.useState(false);

	useEffect(() => {
		if (config.data) {
			setPoint(config.data.point_value ?? 20);
		}
	}, [config.data]);
	return (
		<div className="bg-primary min-h-screen">
			<div className="h-20 shadow-xl relative px-10 flex justify-between items-center">
				<Link href="/dashboard">
					<IoMdArrowBack
						color="#fff"
						size={30}
						className="hover:scale-110 transition-all ease-in-out cursor-pointer"
					/>
				</Link>
				<h1 className="text-center text-2xl text-white items-center flex justify-center left-0 right-0 top-1/3">
					Winap Admin
				</h1>
				<AiOutlineLogout
					className="hover:scale-110 transition-all ease-in-out cursor-pointer justi"
					onClick={() => signOut()}
					color="#fff"
					size={30}
				/>
			</div>

			<div className="mt-10 justify-center flex flex-col items-center">
				<h1 className="text-white text-2xl">Configuraciones</h1>
				<WithLoading isLoading={config.isFetching} isError={config.isError}>
					<div className="mt-10">
						<div className="flex items-center gap-4 mt-4">
							<p className="text-white">1 punto =</p>
							<Input
								type="number"
								className="w-20"
								placeholder="M$X"
								value={point.toString()}
								onChange={(e) => {
									setChange(true);
									setPoint(parseInt(e.target.value));
								}}
							/>
							<p className="text-white">Pesos mexicanos</p>
							{change && (
								<button
									type="button"
									onClick={() => {
										changePoint.mutate({ point_value: point });
										setChange(false);
									}}
									className="text-primary rounded-xl bg-white px-2   right-10  hover:scale-110 transition-all ease-in-out"
								>
									Guardar
								</button>
							)}
						</div>
					</div>
				</WithLoading>
			</div>
		</div>
	);
}
