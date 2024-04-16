import { useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import DetailedDelivery from "@/models/DetailedDelivery.ts";
import Van from "@/models/Van.ts";
import { getDeliveriesByVanId } from "@/services/apiFacade.ts";
import Delivery from "@/models/Delivery.ts";


export default function DetailedVanPage() {
	const van = useLocation().state as Van;
	const [deliveries, setDeliveries] = useState<null | Delivery[]>(null)

	console.log(van);

	useEffect(() => {
		getDeliveriesByVanId(van.id)
			.then(d => setDeliveries(d))
			.catch(() => {
				//TODO: toast
			})
	}, [van]);


	return (
		<>
			<h2 className={"my-3"}>Detailed van page</h2>
			<div className={"flex flex-wrap flex-col gap-10"}>
				<div>
					<p>Id: {van.id}</p>
					<p>Model: {van.model}</p>
					<p>Capacity: {van.capacity} kg.</p>
				</div>
				<div>
					<p>Products:</p>
					{deliveries && deliveries.map((delivery) => (
						<div className={"my-5"}>
							<p>Id: {delivery.id}</p>
							<p>Delivery date: {delivery.deliveryDate.toString()}</p>
							<p>From {delivery.fromWarehouse} to destination: {delivery.destination}</p>
						</div>
					))}
				</div>
			</div>
		</>
	)
}