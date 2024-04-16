import React, { useEffect, useState } from "react";
import Van from "@/models/Van.ts";
import { Label } from "@/components/ui/label.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Button } from "@/components/ui/button.tsx";
import Delivery from "@/models/Delivery.ts";
import { getVans } from "@/services/apiFacade.ts";

type Props = {
	delivery: Delivery | null
	handleSelected: (delivery: Delivery) => void;
}

export default function AssignToVanForm({delivery, handleSelected}: Props) {
	const [vans, setVans] = useState<Van[]>([])


	useEffect(() => {
		getVans()
			.then(v => setVans(v))
			.catch(() => {
				//TODO: toast
			})
	}, []);

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		/*const productRequest: ProductRequest = {
			name,
			price: Number(price),
			weightInGrams: Number(weight)
		}
		handleSubmitForm(productRequest, productToEdit?.id)*/
	}


	return (
		<>
			<div>
				<h2 className={"text-center"}>Assign to van</h2>
				<div className={"flex justify-center"}>
					<form className={"bg-green-300 w-80 px-10 py-5 flex flex-col gap-3"} onSubmit={handleSubmit}>
						<div>
							{delivery && <p>Delivery Id: {delivery.id}</p>}
						</div>

						<div>
							<Label htmlFor="name">Name:</Label>
							//TODO: Ændre til SELECT
							<Input type="text" value={vans} onChange={e => setVans(e.target.value)} />
						</div>


						<div className={"flex justify-center mt-7"}>
							<Button type={"submit"}>Submit</Button>
						</div>
					</form>
				</div>
			</div>
		</>
	)
}