import { useAuth } from "@clerk/nextjs";
import React from "react";
import { UserButton } from "@clerk/nextjs";
import {
	AiOutlineLogout,
	AiFillSetting,
	AiOutlineShop,
	AiFillShop,
} from "react-icons/ai";
import { BsFillGridFill } from "react-icons/bs";

import {} from "react-icons/io";
import Link from "next/link";
import { useRouter } from "next/router";
export default function DAHSBOARD() {
	const { signOut } = useAuth();
	const router = useRouter();
	return (
		<div className="bg-primary min-h-screen">
			<div className="h-20 shadow-xl relative px-10 flex justify-end items-center">
				<h1 className="text-center text-2xl text-white items-center flex justify-center absolute left-0 right-0 top-1/3">
					Winap Admin
				</h1>
				<AiOutlineLogout
					className="hover:scale-110 transition-all ease-in-out cursor-pointer z-10"
					onClick={() => {
						signOut();
						router.push("/");
					}}
					color="#fff"
					size={30}
				/>
			</div>

			<div className="mt-10 md:flex md gap-10 items-center justify-center px-10">
				<Link
					href="/dashboard/business"
					className="h-36 mx-auto bg-white md:w-2/6 mt-4 w-5/6 border-2 rounded-xl flex flex-col items-center justify-center shadow-2xl cursor-pointer transition-all ease-in hover:scale-105"
				>
					<AiFillShop size={100} className="text-primary" />
					<p className="text-primary mt-2">Sucursales</p>
				</Link>

				<Link
					href="/dashboard/categories"
					className="h-36 mx-auto bg-white md:w-2/6 mt-4 w-5/6 border-2 rounded-xl flex flex-col items-center justify-center shadow-2xl cursor-pointer transition-all ease-in hover:scale-105"
				>
					<BsFillGridFill size={100} className="text-primary" />
					<p className="text-primary mt-2">Categorias</p>
				</Link>
				<Link
					className="h-36 mx-auto bg-white md:w-2/6 mt-4 w-5/6 border-2 rounded-xl flex flex-col items-center justify-center shadow-2xl cursor-pointer transition-all ease-in hover:scale-105"
					href="/dashboard/settings"
				>
					<AiFillSetting size={100} className="text-primary" />
					<p className="text-primary mt-2">Configuraciones</p>
				</Link>
			</div>
		</div>
	);
}
