import React, { useEffect, useState } from "react";
import Van from "@/models/Van.ts";
import { Label } from "@/components/ui/label.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Button } from "@/components/ui/button.tsx";
import Delivery from "@/models/Delivery.ts";
import { getCurrentWeightForVanById, getSingleDelivery, getVans } from "@/services/apiFacade.ts";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from "@/components/ui/select";
import DetailedDelivery from "@/models/DetailedDelivery.ts";

type Props = {
	deliveryId: number | undefined
	handleSubmitForm: (deliveryId: number, vanId: number) => void;
}



export default function AssignToVanForm({ deliveryId, handleSubmitForm }: Props) {
	const [vans, setVans] = useState<Van[]>([]);
	const [selectedVanId, setSelectedVanId] = useState("");
	const [selectedDelivery, setSelectedDelivery] = useState<DetailedDelivery | null>(null);
	const [currentVanWeight, setCurrentVanWeight] = useState<null | number>(null);

	useEffect(() => {
		getVans()
			.then(v => setVans(v))
			.catch(() => {
				//TODO: toast
			});

	}, []);

	useEffect(() => {
		if (!deliveryId) return;

		getSingleDelivery(deliveryId)
			.then((d) => setSelectedDelivery(d))
			.catch(() => {
				//TODO toast
			});

	}, [deliveryId]);

	useEffect(() => {
		if (!selectedVanId) return;

		getCurrentWeightForVanById(Number(selectedVanId))
			.then((w) => setCurrentVanWeight(w))
			.catch(() => {
				//TODO: toast
			})
	}, [selectedVanId]);

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		handleSubmitForm(deliveryId!, Number(selectedVanId!));
		setSelectedVanId("");
		setSelectedDelivery(null);
		setCurrentVanWeight(null);
	};

	const deliveryWeight = selectedDelivery?.products
		.reduce((acc, item) => acc + ((item.product.weightInGrams / 1000) * item.quantity), 0) || 0;

	let isOverweight = false;

	const van = vans.find((v) => v.id == Number(selectedVanId));

	if (deliveryWeight && van) {
		isOverweight = currentVanWeight! + deliveryWeight > van.capacity;
	}

	return (
		<>
			<div>
				<h2 className={"text-center"}>Assign to van</h2>
				<div className={"flex justify-center"}>
					<form className={`${deliveryId ? "bg-blue-200" : "bg-yellow-200"} w-80 px-10 py-5 flex flex-col gap-3`} onSubmit={handleSubmit}>
						<div>
							<p>Selected delivery Id: <span className={"px-2"}>{deliveryId}</span></p>
							<p>Weight: <span className={`px-2 ${isOverweight ? "text-red-600" : "text-green-500"}`}>{deliveryWeight}</span></p>
						</div>

						<div>
							<Label htmlFor="van">Van:</Label>
							<Select value={selectedVanId} onValueChange={(value) => setSelectedVanId(value)}  disabled={!deliveryId}>
								<SelectTrigger>
									<SelectValue placeholder="Select van for the delivery" />
								</SelectTrigger>
								<SelectContent>
									{vans && vans.map((v) => <SelectItem value={String(v.id)}  >{v.model}, {v.capacity} kg.</SelectItem>)}
								</SelectContent>
								<p>Current weight in kg: <span className={isOverweight ? "text-red-600" : "text-green-500"}>{currentVanWeight}</span></p>
							</Select>
						</div>

						<div className={"flex justify-center mt-7"}>
							<Button disabled={isOverweight || !selectedVanId} type={"submit"}>Submit</Button>
						</div>
					</form>
				</div>
			</div>
		</>
	);
}