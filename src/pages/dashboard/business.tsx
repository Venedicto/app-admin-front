import { useAuth } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";
import { AiOutlineLogout } from "react-icons/ai";
import { IoMdArrowBack } from "react-icons/io";
import { api } from "~/utils/api";
import WithLoading from "@venedicto/ui-library/dist/components/WithLoading";

export default function business() {
	const { signOut } = useAuth();
	const { isError, isLoading, data } = api.api.getBusinesses.useQuery();
	return (
		<div className="bg-primary">
			<div className="h-20 shadow-xl relative px-10 flex justify-between items-center">
				<Link href="/dashboard">
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

			<div className="py-20 w-full items-center justify-center flex-col flex min-h-max">
				<h1 className="text-white text-3xl font-bold">Sucursales</h1>
				<div className="mt-10 w-full min-h-screen">
					<WithLoading isLoading={isLoading} isError={isError}>
						<div className="mt-10 px-10 grid lg:grid-cols-5 md:grid-cols-3 gap-4 grid-cols-1">
							{data?.map((business) => (
								<Link href={`/dashboard/business/${business.id}`}>
									<div
										style={{
											backgroundColor: business.active
												? "white"
												: "rgba(252 165 165 0.2);",
										}}
										className="w-full h-28 rounded-xl  flex items-center px-2 gap-4 hover:scale-105 transition-all ease-soft-spring relative bg-red-300 cursor-pointer"
									>
										<img
											className="w-20 h-20 rounded-lg"
											src={business.logo ?? ""}
											alt="logo"
										/>
										<div>
											<p className="text-primary overflow-hidden font-bold">
												{business.name}
											</p>
											<p>{business.description}</p>
										</div>
									</div>
								</Link>
							))}
						</div>
					</WithLoading>
				</div>
			</div>
		</div>
	);
}
