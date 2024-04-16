import { useEffect, useState } from "react";
import Delivery from "@/models/Delivery.ts";
import { getDeliveries } from "@/services/apiFacade.ts";
import DeliveryTable from "@/components/core/delivery/DeliveryTable.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Link } from "react-router-dom";


export default function DeliveriesListPage() {
	const [deliveries, setDeliveries] = useState<null | Delivery[]>(null)

	useEffect(() => {
		getDeliveries()
			.then((d) => setDeliveries(d))
			.catch((e:Error) => {
				console.log(e.message);
			})
	}, []);


	return (
		<>

			<h2 className={"text-center"}>Deliveries</h2>
			<div>
				<Link to={"/add/delivery"}>
					<Button>Opret ny</Button>
				</Link>
			</div>
			<DeliveryTable deliveries={deliveries}/>
		</>
	)
}