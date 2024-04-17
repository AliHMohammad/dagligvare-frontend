import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Delivery from "@/models/Delivery.ts";
import { getSingleDelivery, updateDeliveryByIdWithProducts, UpdateDeliveryRequest } from "@/services/apiFacade.ts";
import DetailedDelivery from "@/models/DetailedDelivery.ts";
import AssignProductsToDeliveryForm from "@/components/forms/AssignProductsToDeliveryForm.tsx";
import { toast } from "@/components/ui/use-toast.ts";


export default function DetailedDeliveryPage() {
	const {id} = useParams();
	const [delivery, setDelivery] = useState<DetailedDelivery | null>(null);
	const navigate = useNavigate();

	useEffect(() => {
		getSingleDelivery(Number(id!))
			.then((d) => setDelivery(d))
			.catch(() => {
				//TODO: toast
			})
	}, [id]);

	const onSubmit = (request: UpdateDeliveryRequest[]) => {
		console.log(request);
		updateDeliveryByIdWithProducts(request, delivery!.id)
			.then(() => {
				toast({
					title: "Delivery updated with products!",
					description: "Delivery updated with products!",
				});
				navigate("/deliveries")
			})
			.catch(() => {
				toast({
					title: "Something went wrong!",
					description: "Could not update delivery with products.",
					variant: "destructive"
				});
			})
	}

	return (
		<>
			<h2>Products:</h2>
			<div className={"grid grid-cols-1 lg:grid-cols-2"}>
				<div>
					<ul>
						{delivery && delivery.products.map((p) => <li key={p.product.id}>{p.product.name}, {p.quantity} stk.</li>)}
					</ul>
				</div>
				<div>
					{!delivery || !delivery?.products.length && <AssignProductsToDeliveryForm onSubmit={onSubmit} />}
				</div>
			</div>
		</>
	)
}