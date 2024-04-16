import { useEffect, useState } from "react";
import Delivery from "@/models/Delivery.ts";
import { assignDeliveryToVanById, getDeliveries } from "@/services/apiFacade.ts";
import DeliveryTable from "@/components/core/delivery/DeliveryTable.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Link } from "react-router-dom";
import AssignToVanForm from "@/components/forms/AssignToVanForm.tsx";
import { toast } from "@/components/ui/use-toast.ts";


export default function DeliveriesListPage() {
	const [deliveries, setDeliveries] = useState<null | Delivery[]>(null);
	const [selectedDelivery, setSelectedDelivery] = useState<null | Delivery>(null);

	console.log(selectedDelivery);

	useEffect(() => {

		getDeliveries()
			.then((d) => setDeliveries(d))
			.catch((e: Error) => {
				console.log(e.message);
			});


	}, [selectedDelivery]);

	const handleSelected = (delivery: Delivery | null) => {
		setSelectedDelivery(delivery);
	};

	const handleSubmitForm = (deliveryId: number, vanId: number) => {

		assignDeliveryToVanById(deliveryId, vanId)
			.then(() => {
				toast({
					title: "Delivery assigned to van!",
					description: "Delivery with id " + deliveryId + " assigned to van!",
				});
				setSelectedDelivery(null);
			})
			.catch(() => {
				toast({
					title: "Something went wrong!",
					description: "Could not assign delivery to van.",
					variant: "destructive"
				});
			})
	};


	return (
		<>

			<h2 className={"text-center"}>Deliveries</h2>
			<div>
				<Link to={"/add/delivery"}>
					<Button>Add Delivery</Button>
				</Link>
			</div>
			<div className={"flex flex-wrap flex-row justify-evenly"}>
				<DeliveryTable deliveries={deliveries} handleSelected={handleSelected} />
				<AssignToVanForm deliveryId={selectedDelivery?.id} handleSubmitForm={handleSubmitForm} />
			</div>

		</>
	);
}