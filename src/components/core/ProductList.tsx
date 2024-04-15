import Product from "@/models/Product.ts";
import ProductListItem from "@/components/core/ProductListItem.tsx";
import { deleteProduct } from "@/services/apiFacade.ts";
import React from "react";


type Props = {
	products: Product[],
	setProducts: React.Dispatch<React.SetStateAction<Product[]>>
}

export default function ProductList({ products, setProducts }: Props) {

	const handleDelete = (productId: number) => {
		deleteProduct(productId)
			.then(() => {
				setProducts((prev) => prev.filter(p => p.id !== productId))
			})
			.catch((e: Error) => {

			})
	}

	return (
		<>
			{products.length ?
				<div className={"flex flex-wrap  gap-10"}>
					{products.map(p => <ProductListItem key={p.id} product={p} handleDelete={handleDelete} />)}
				</div> :
				<h2>Fetching...</h2>}
		</>
	);
}