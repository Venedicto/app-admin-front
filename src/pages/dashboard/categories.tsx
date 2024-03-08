import { useAuth } from "@clerk/nextjs";
import WithLoading from "@venedicto/ui-library/dist/components/WithLoading";
import Modal from "@venedicto/ui-library/dist/components/Modal";
import AreYouSure from "@venedicto/ui-library/dist/components/AreYouSureModal";
import useModal from "@venedicto/ui-library/dist/hooks/useModal";
import Link from "next/link";
import React from "react";
import { AiOutlineLogout } from "react-icons/ai";
import { IoMdArrowBack, IoMdAdd, IoMdTrash } from "react-icons/io";
import { api } from "~/utils/api";
import { Input } from "@nextui-org/react";
import toast from "react-hot-toast";

export default function categories() {
	const { signOut } = useAuth();
	const modal = useModal();
	const deleteModal = useModal();
	const [text, setText] = React.useState("");

	const { data, isError, isFetching, refetch } =
		api.api.getCategories.useQuery();
	const category = api.api.createCategory.useMutation({
		onSuccess: () => {
			refetch();
			modal.close();
		},
		onError: () => {
			toast.error("No puedes agregar una categoria con el mismo nombre");
			modal.close();
		},
	});
	const deleteCategory = api.api.deleteCategory.useMutation({
		onSuccess: () => {
			refetch();
			deleteModal.close();
		},
		onError: (err) => {
			if (err.message.includes("violates foreign key constraint")) {
				toast.error("No puedes eliminar una categoria con productos");
			}
			deleteModal.close();
		},
	});

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
			<div className="mt-20 w-full items-center justify-center flex-col flex">
				<div className="flex items-center justify-center relative">
					<p className="text-white mt-2 text-2xl">Sucursales</p>
					<IoMdAdd
						className="mt-2 pl-4 hover:scale-105 transition-all ease-linear cursor-pointer"
						size={45}
						color="#fff"
						onClick={() => modal.open()}
					/>
				</div>
				<WithLoading isLoading={isFetching} isError={isError}>
					<div className="mt-10 px-10 flex flex-col gap-4">
						{data?.map((category) => (
							<div
								key={category.id}
								className="flex items-center justify-between gap-3"
							>
								<p className="text-primary overflow-hidden font-bold text-center bg-white px-4 rounded-xl py-2 w-36">
									{category.name}
								</p>
								{/* <IoMdTrash
									className="hover:scale-105 transition-all ease-linear cursor-pointer"
									color="white"
									size={25}
									onClick={() => deleteModal.open()}
								/> */}
							</div>
						))}
					</div>
				</WithLoading>
			</div>
			<Modal
				title="Agregar Categoria"
				classNameAccept="bg-primary"
				classNameCancel="bg-red-600 hover:bg-red-600"
				acceptButtonText="Agregar"
				classNameTitle="text-red-500"
				classNamecontainer="bg-white"
				open={modal.isOpen}
				onClose={modal.close}
				onAccept={() => {
					category.mutate({ name: text });
				}}
				loading={category.isLoading}
			>
				<div className="bg-white">
					<Input
						label="Nombre"
						onChange={(e) => {
							setText(e.target.value);
						}}
						value={text}
					/>
				</div>
			</Modal>
			{/* @ts-ignore */}
			<AreYouSure
				title="Eliminar Categoria"
				classNameBody="text-red-300"
				classNameAccept="bg-red-600"
				classNameCancel="bg-blue-500 hover:bg-red-600"
				acceptButtonText="Eliminar"
				classNameTitle="text-red-500"
				classNamecontainer="bg-white"
				open={deleteModal.isOpen}
				onClose={deleteModal.close}
				onAccept={() => {
					deleteCategory.mutate({ id: 1 });
				}}
				loading={deleteCategory.isLoading}
			>
				<div>
					<p>¿Estas seguro de eliminar esta categoria?</p>
				</div>
			</AreYouSure>
		</div>
	);
}
