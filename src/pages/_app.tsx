import { type AppType } from "next/app";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { NextUIProvider } from "@nextui-org/react";
import { Toaster } from "react-hot-toast";
import { api } from "~/utils/api";

import "~/styles/globals.css";

const inter = Inter({
	subsets: ["latin"],
	variable: "--font-sans",
});
const MyApp: AppType = ({ Component, pageProps }) => {
	return (
		<NextUIProvider>
			<ClerkProvider {...pageProps}>
				<main className={`font-sans ${inter.variable}`}>
					<Component {...pageProps} />
					<Toaster />
				</main>
			</ClerkProvider>
		</NextUIProvider>
	);
};

export default api.withTRPC(MyApp);
