import { Label } from "@/components/ui/label.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Button } from "@/components/ui/button.tsx";
import React, { useState } from "react";
import { DeliveryRequest, ProductRequest } from "@/services/apiFacade.ts";

type Props = {
	handleSubmitForm: (request: DeliveryRequest) => void;
}

export default function DeliveryForm({handleSubmitForm}: Props) {
	const [warehouse, setWarehouse] = useState("");
	const [destination, setDestination] = useState("");
	const [delivery, setDelivery] = useState();

	const handleSubmit = (e: React.FormEvent<HTMLButtonElement>) => {
		e.preventDefault();

		const deliveryRequest: DeliveryRequest = {

		}

		handleSubmitForm(deliveryRequest)
	}

	return (
		<>
			<h2 className={"text-center"}>Delivery form</h2>
			<div className={"flex justify-center"}>
				<form className={"bg-green-300 w-80 px-10 py-5 flex flex-col gap-3"}>
					<div>
						<Label htmlFor="name">From Warehouse:</Label>
						<Input type="text" value={warehouse} onChange={e => setWarehouse(e.target.value)} />
					</div>

					<div>
						<Label htmlFor="name">Destination</Label>
						<Input type="text" value={destination} onChange={e => setDestination(e.target.value)} />
					</div>

					{/*<div>
						<Label htmlFor="name">Delivery Date:</Label>
						<Input type="text" value={} onChange={e => null} />
					</div>*/}




					<div className={"flex justify-center mt-7"}>
						<Button onClick={(e) => handleSubmit(e)}>Submit</Button>
					</div>
				</form>
			</div>
		</>
	)
}