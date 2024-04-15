import NavHeader from "@/components/layouts/NavHeader.tsx";
import { ReactNode } from "react";

type Props = {
	children: ReactNode
}


export default function PageLayout({ children }: Props) {

	return (
		<>
			<NavHeader />
			<main className={"m-8"}>
				{children}
			</main>
		</>
	);
}