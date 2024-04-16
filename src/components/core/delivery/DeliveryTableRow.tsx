import Delivery from "@/models/Delivery.ts";
import { Button } from "@/components/ui/button.tsx";
import { Link } from "react-router-dom";


type Props = {
	delivery: Delivery
	handleSelected: (delivery: Delivery) => void;
}


export default function DeliveryTableRow({delivery, handleSelected}: Props) {


	return (
		<>
			<tr>
				<td className={"text-center"}>{delivery.id}</td>
				<td className={"text-center"}>{delivery.deliveryDate.toLocaleString()}</td>
				<td className={"text-center"}>{delivery.fromWarehouse}</td>
				<td className={"text-center"}>{delivery.destination}</td>
				<td className={"flex gap-1 flex-wrap"}>
					<Link to={String(delivery.id)} >
						<Button>Details</Button>
					</Link>
					{!delivery.vanId && <Button onClick={() => handleSelected(delivery)}>Assign Van</Button>}
				</td>
			</tr>
		</>
	)
}