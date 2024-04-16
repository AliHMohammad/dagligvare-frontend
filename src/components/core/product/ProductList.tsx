import Product from "@/models/Product.ts";
import ProductListItem from "@/components/core/product/ProductListItem.tsx";
import { deleteProduct } from "@/services/apiFacade.ts";
import React, { Dispatch, SetStateAction } from "react";
import { useToast } from "@/components/ui/use-toast.ts";


type Props = {
	products: Product[],
	setProducts: Dispatch<SetStateAction<Product[]>>;
}

export default function ProductList({ products, setProducts }: Props) {
	const { toast } = useToast();

	const handleDelete = (productToDelete: Product) => {
		deleteProduct(productToDelete.id)
			.then(() => {
				toast({
					title: "product deleted!",
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
				<div className="grid animate-fade-in grid-cols-1 justify-items-center gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
					{products.map(p => <ProductListItem key={p.id} product={p} handleDelete={handleDelete} />)}
				</div> :
				<h2 className={"text-3xl text-center"}>No matching products found</h2>}
		</>
	);
}