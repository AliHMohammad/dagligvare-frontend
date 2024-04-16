import Delivery from "@/models/Delivery.ts";
import DeliveryTableRow from "@/components/core/delivery/DeliveryTableRow.tsx";


type Props = {
	deliveries: Delivery[] | null
	handleSelected: (delivery: Delivery) => void;
}

export default function DeliveryTable({deliveries, handleSelected}: Props) {


	return (
		<>
			<table>
				<thead>
					<tr>
						<td className="px-4 text-center">Id</td>
						<td className="px-4 text-center">Delivery Date</td>
						<td className="px-4 text-center">Warehouse</td>
						<td className="px-4 text-center">Destination</td>
					</tr>
				</thead>
				<tbody>
				{deliveries &&
					deliveries.map((d) => <DeliveryTableRow key={d.id} delivery={d} handleSelected={handleSelected}/>)
				}
				</tbody>
			</table>
		</>
	)
}