import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Delivery from "@/models/Delivery.ts";
import { getSingleDelivery } from "@/services/apiFacade.ts";
import DetailedDelivery from "@/models/DetailedDelivery.ts";


export default function DetailedDeliveryPage() {
	const {id} = useParams();
	const [delivery, setDelivery] = useState<DetailedDelivery | null>(null);

	useEffect(() => {
		getSingleDelivery(Number(id!))
			.then((d) => setDelivery(d))
			.catch(() => {
				//TODO: toast
			})
	}, [id]);

	return (
		<>
			<p>Products:</p>
			<ul>
				{delivery && delivery.products.map((p) => <li key={p.product.id}>{p.product.name}, {p.quantity} stk.</li>) }
			</ul>
		</>
	)
}