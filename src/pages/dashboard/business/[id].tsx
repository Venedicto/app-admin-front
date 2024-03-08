import { useAuth } from "@clerk/nextjs";
import WithLoading from "@venedicto/ui-library/dist/components/WithLoading";
import Link from "next/link";
import { useParams } from "next/navigation";
import React from "react";
import { AiOutlineLogout } from "react-icons/ai";
import { IoMdArrowBack } from "react-icons/io";
import { api } from "~/utils/api";

export default function detailsBusiness() {
	const params = useParams();
	const { signOut } = useAuth();
	const { isError, isLoading, data, refetch } = api.api.getBusiness.useQuery({
		id: parseInt(params?.id?.toString() ?? ""),
	});
	const { mutate } = api.api.changeStatus.useMutation({
		onSuccess: () => {
			refetch();
		},
		onError: () => {
			refetch();
		},
	});
	return (
		<div className="h-screen bg-primary">
			<div className="h-20 shadow-xl relative px-10 flex justify-between items-center">
				<Link href="/dashboard/business">
					<IoMdArrowBack
						color="#fff"
						size={30}
						className="hover:scale-110 transition-all ease-in-out cursor-pointer"
					/>
				</Link>
				<h1 className="text-center text-2xl text-white items-center flex justify-center">
					Winap Admin
				</h1>
				<AiOutlineLogout
					className="hover:scale-110 transition-all ease-in-out cursor-pointer justi"
					onClick={() => signOut()}
					color="#fff"
					size={30}
				/>
			</div>

			<div className="mt-20">
				<WithLoading isLoading={isLoading} isError={isError}>
					<div className="w-full flex flex-col justify-center items-center gap-3">
						<div className="w-1/2">
							<img
								className="w-full h-20 object-contain aspect-square rounded-xl"
								src={data?.logo ?? ""}
								alt="logo"
							/>
						</div>
						<div className=" mt-4 gap-4 ">
							<div className="flex justify-center gap-4">
								<p className="text-white text-xl text-center font-bold">
									Nombre:
								</p>
								<p className="text-white text-xl text-left">{data?.name}</p>
							</div>
							<div className="flex justify-center gap-4">
								<p className="text-white text-xl text-center font-bold">
									Descripcion:
								</p>
								<p className="text-white text-xl text-center">
									{data?.description}
								</p>
							</div>
							<div className="flex justify-center gap-4">
								<p className="text-white text-xl text-left font-bold">
									Direccion:
								</p>
								<p className="text-white text-xl text-center">
									{data?.address}
								</p>
							</div>

							<div className="flex justify-center gap-4 ">
								<p className="text-white text-xl text-center font-bold">
									Activo:
								</p>
								<div className="flex justify-center gap-4">
									<p className="text-white text-xl text-center">
										{data?.active ? "Si" : "No"}
									</p>
									<button
										type="button"
										onClick={() => {
											mutate({ id: data?.id || 0, active: !data?.active });
										}}
										className="text-primary rounded-xl bg-white px-2   right-10  hover:scale-110 transition-all ease-in-out"
									>
										{data?.active ? "Desactivar" : "Activar"}
									</button>
								</div>
							</div>
						</div>
					</div>
				</WithLoading>
			</div>
		</div>
	);
}
