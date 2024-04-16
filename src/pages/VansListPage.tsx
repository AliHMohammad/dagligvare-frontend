import { useEffect, useState } from "react";
import Van from "@/models/Van.ts";
import { getVans } from "@/services/apiFacade.ts";
import { Link } from "react-router-dom";


export default function VansListPage() {
	const [vans, setVans] = useState<Van[] | null>(null);

	useEffect(() => {
		getVans()
			.then((v) => setVans(v))
			.catch(() => {
				//TODO: toast
			})
	}, [])

	return (
		<>
			<ul>
				{vans && vans.map(van => (
					<li key={van.id}>
						<Link to={String(van.id)} state={van}>
							<span className={"font-bold cursor-pointer"}>{van.model}</span>
						</Link>, {van.capacity} kg.
					</li>
				))}
			</ul>
		</>
	)
}