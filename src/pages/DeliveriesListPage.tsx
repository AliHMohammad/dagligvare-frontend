import { useEffect, useState } from "react";
import Delivery from "@/models/Delivery.ts";
import { getDeliveries } from "@/services/apiFacade.ts";
import DeliveryTable from "@/components/core/delivery/DeliveryTable.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Link } from "react-router-dom";
import AssignToVanForm from "@/components/forms/AssignToVanForm.tsx";


export default function DeliveriesListPage() {
	const [deliveries, setDeliveries] = useState<null | Delivery[]>(null);
	const [selectedDelivery, setSelectedDelivery] = useState<null | Delivery>(null);

	console.log(selectedDelivery);

	useEffect(() => {
		getDeliveries()
			.then((d) => setDeliveries(d))
			.catch((e:Error) => {
				console.log(e.message);
			})
	}, []);

	const handleSelected = (delivery: Delivery | null) => {
		setSelectedDelivery(delivery);
	}


	return (
		<>

			<h2 className={"text-center"}>Deliveries</h2>
			<div>
				<Link to={"/add/delivery"}>
					<Button>Opret ny</Button>
				</Link>
			</div>
			<div className={"flex flex-wrap flex-row justify-evenly"}>
				<DeliveryTable deliveries={deliveries} handleSelected={handleSelected} />
				<AssignToVanForm delivery={selectedDelivery} handleSelected={handleSelected}/>
			</div>

		</>
	)
}