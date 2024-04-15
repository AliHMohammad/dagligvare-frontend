import { NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button.tsx";
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink } from "@/components/ui/navigation-menu.tsx";


export default function NavHeader() {

	return (
		<>
			<div className={"bg-gray-300 py-5"}>
				<h1 className={"text-center font-bold text-4xl"}>Dagligvare - Ali Mohammad</h1>
			</div>
			<nav className={"flex flex-wrap gap-7 bg-red-300 p-2"}>
				<NavLink to={"/products"}>
					Products
				</NavLink>
				<NavLink to={"/deliveries"}>
					Deliveries
				</NavLink>
			</nav>
		</>
	);
}