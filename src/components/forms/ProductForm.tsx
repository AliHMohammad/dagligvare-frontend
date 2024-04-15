import Product from "@/models/Product.ts";
import { useLocation } from "react-router-dom";
import React, { useState } from "react";
import { Button } from "@/components/ui/button.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Label } from "@/components/ui/label.tsx";
import { createProduct, ProductRequest, updateProduct } from "@/services/apiFacade.ts";


type Props = {
	handleSubmitForm: (productRequest: ProductRequest, id: number | null) => void;
}

export default function ProductForm({handleSubmitForm}: Props) {
	const productToEdit = useLocation().state as Product || null;
	const [name, setName] = useState(productToEdit?.name || "");
	const [price, setPrice] = useState(productToEdit?.price || "");
	const [weight, setWeight] = useState(productToEdit?.weightInGrams || "");


	const handleSubmit = (e: React.FormEvent<HTMLButtonElement>) => {
		e.preventDefault();

		const productRequest: ProductRequest = {
			name,
			price: Number(price),
			weightInGrams: Number(weight)
		}
		handleSubmitForm(productRequest, productToEdit?.id)
	}

	return (
		<>
			<h2 className={"text-center"}>Product form</h2>
			<div className={"flex justify-center"}>
				<form className={"bg-green-300 w-80 px-10 py-5 flex flex-col gap-3"}>
					<div>
						<Label htmlFor="name">Name:</Label>
						<Input type="text" value={name} onChange={e => setName(e.target.value)} />
					</div>

					<div>
						<Label htmlFor="name">Price:</Label>
						<Input type="text" value={price} onChange={e => setPrice(e.target.value)} />
					</div>

					<div>
						<Label htmlFor="name">Weight (grams):</Label>
						<Input type="text" value={weight} onChange={e => setWeight(e.target.value)} />
					</div>

					<div className={"flex justify-center mt-7"}>
						<Button onClick={(e) => handleSubmit(e)}>Submit</Button>
					</div>
				</form>
			</div>
		</>
	)
}