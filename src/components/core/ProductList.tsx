import Product from "@/models/Product.ts";
import ProductListItem from "@/components/core/ProductListItem.tsx";
import { deleteProduct } from "@/services/apiFacade.ts";
import React from "react";
import { useToast } from "@/components/ui/use-toast.ts";


type Props = {
	products: Product[],
	setProducts: React.Dispatch<React.SetStateAction<Product[]>>
}

export default function ProductList({ products, setProducts }: Props) {
	const { toast } = useToast();

	const handleDelete = (productToDelete: Product) => {
		deleteProduct(productToDelete.id)
			.then(() => {
				toast({
					title: "Product deleted!",
					description: productToDelete.name + " has been deleted."
				});
				setProducts((prev) => prev.filter(p => p.id !== productToDelete.id));
			})
			.catch((e: Error) => {
				toast({
					title: "Something went wrong!",
					description: "Could not delete " + productToDelete.name + ".",
					variant: "destructive"
				});
				console.log(e.message);
			});
	};

	return (
		<>
			{products.length ?
				<div className={"flex flex-wrap justify-start gap-10"}>
					{products.map(p => <ProductListItem key={p.id} product={p} handleDelete={handleDelete} />)}
				</div> :
				<h2>Fetching...</h2>}
		</>
	);
}