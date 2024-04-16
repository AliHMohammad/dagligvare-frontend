import { Label } from "@/components/ui/label.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Button } from "@/components/ui/button.tsx";
import React, { useState } from "react";
import { DeliveryRequest } from "@/services/apiFacade.ts";
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover"

type Props = {
	handleSubmitDeliveryForm: (request: DeliveryRequest) => void;
}

export default function DeliveryForm({handleSubmitDeliveryForm}: Props) {
	const [warehouse, setWarehouse] = useState("");
	const [destination, setDestination] = useState("");
	const [deliveryDate, setDeliveryDate] = React.useState<Date>()

	const handleSubmit = (e:  React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const deliveryRequest: DeliveryRequest = {
			destination,
			deliveryDate: deliveryDate as Date,
			fromWarehouse: warehouse,
		}

		console.log(deliveryRequest);

		handleSubmitDeliveryForm(deliveryRequest);
	}

	return (
		<>
			<h2 className={"text-center"}>Delivery form</h2>
			<div className={"flex justify-center"}>
				<form className={"bg-green-300 w-80 px-10 py-5 flex flex-col gap-3"} onSubmit={handleSubmit}>
					<div>
						<Label htmlFor="name">From Warehouse: </Label>
						<Input required={true} type="text" value={warehouse} onChange={e => setWarehouse(e.target.value)} />
					</div>

					<div>
						<Label htmlFor="name">Destination: </Label>
						<Input required={true} type="text" value={destination} onChange={e => setDestination(e.target.value)} />
					</div>

					<div>
						<Label>Date: </Label>
						<Popover>
							<PopoverTrigger asChild>
								<Button
									variant={"outline"}
									className={cn("w-full justify-start text-left font-normal", !deliveryDate && "text-muted-foreground")}
								>
									<CalendarIcon className="mr-2 h-4 w-4" />
									{deliveryDate ? format(deliveryDate, "PPP") : <span>Pick a date</span>}
								</Button>
							</PopoverTrigger>
							<PopoverContent className="w-auto p-0">
								<Calendar
									mode="single"
									captionLayout="dropdown-buttons"
									fromDate={new Date()}
									selected={deliveryDate}
									onSelect={setDeliveryDate}
									className="rounded-md border"
									initialFocus
									showOutsideDays
									fixedWeeks
									required={true}
								/>
							</PopoverContent>
						</Popover>
					</div>



					<div className={"flex justify-center mt-7"}>
						<Button disabled={!deliveryDate} type={"submit"}>Submit</Button>
					</div>
				</form>
			</div>
		</>
	)
}