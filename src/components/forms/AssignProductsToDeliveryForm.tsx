import React, { useEffect, useState } from "react";
import Product from "@/models/Product.ts";
import { getProducts, UpdateDeliveryRequest } from "@/services/apiFacade.ts";
import { Label } from "@/components/ui/label.tsx";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input.tsx";
import { Button } from "@/components/ui/button.tsx";
import { SavedProducts } from "@/types.ts";
import DeliveryPriceCalculator from "@/components/core/delivery/DeliveryPriceCalculator.tsx";
import { useNavigate } from "react-router-dom";

type Props = {
	onSubmit:  (request: UpdateDeliveryRequest[]) => void;
}

export default function AssignProductsToDeliveryForm({onSubmit}: Props) {
	const [products, setProducts] = useState<null | Product[]>(null);
	const [savedProducts, setSavedProducts] = useState<SavedProducts[]>([]);
	const [selectedProductId, setSelectedProductId] = useState("");
	const [quantity, setQuantity] = useState("");



	useEffect(() => {
		getProducts()
			.then((p) => setProducts(p))
			.catch(() => {
				//TODO: toast
			})
	}, []);


	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const request: UpdateDeliveryRequest[] = savedProducts.map((item) => {
			return {
				quantity: item.quantity,
				productId: item.product.id
			}
		})

		onSubmit(request);
	}

	const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault()
		const product = products?.find((p) => p.id == Number(selectedProductId))

		const newSavedProduct: SavedProducts = {
			product:  product!,
			quantity: Number(quantity)
		}

		setSavedProducts((prev) => [...prev, newSavedProduct])
		setQuantity("");
		setSelectedProductId("");
	}

	console.log(savedProducts);

	return (
		<>
			<div className={"flex flex-wrap flex-row gap-10"}>
				<form className={"bg-green-300 w-80 px-10 py-5 flex flex-col gap-5"} onSubmit={handleSubmit}>
					<div>
						<h2 className={"text-center"}>Add Products</h2>
					</div>
					<div>
						<Label>Products</Label>
						<Select value={selectedProductId} onValueChange={(v) => setSelectedProductId(v)}>
							<SelectTrigger>
								<SelectValue placeholder="Select product(s)" />
							</SelectTrigger>
							<SelectContent>
								{products &&
									products.map((product) => {
										if (savedProducts.some((savedProduct) => product.id == savedProduct.product.id)) {
											return null;
										} else {
											return (
												<SelectItem key={product.id} value={String(product.id)}>
													{product.name}
												</SelectItem>
											);
										}
									})}
							</SelectContent>
						</Select>
						<Label>Quantity</Label>
						<Input type={"number"} max={20} value={quantity} onChange={(e) => setQuantity(e.target.value)} />

						<div className={"flex justify-center my-3"}>
							<Button type={"button"} onClick={handleClick}>Save</Button>
						</div>
					</div>

					<div className={"flex justify-center"}>
						<Button type={"submit"}>Submit</Button>
					</div>
				</form>
				<DeliveryPriceCalculator products={savedProducts} />
			</div>
		</>
	)
}