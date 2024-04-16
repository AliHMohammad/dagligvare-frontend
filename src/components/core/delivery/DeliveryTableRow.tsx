import Delivery from "@/models/Delivery.ts";
import { Button } from "@/components/ui/button.tsx";


type Props = {
	delivery: Delivery
}


export default function DeliveryTableRow({delivery}: Props) {


	return (
		<>
			<tr>
				<td className={"text-center"}>{delivery.id}</td>
				<td className={"text-center"}>{delivery.deliveryDate.toLocaleString()}</td>
				<td className={"text-center"}>{delivery.fromWarehouse}</td>
				<td className={"text-center"}>{delivery.destination}</td>
				<td>
					<Button>Details</Button>
				</td>
			</tr>
		</>
	)
}