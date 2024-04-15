import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getSingleProduct } from "@/services/apiFacade.ts";
import Product from "@/models/Product.ts";
import { toast } from "@/components/ui/use-toast.ts";


export default function DetailedProductPage() {
	const {id} = useParams();
	const [product, setProduct] = useState<Product | null>(null)
	const [error, setError] = useState(false);

	useEffect(() => {
		getSingleProduct(Number(id!))
			.then((p) => setProduct(p))
			.catch(() => {
				toast({
					title: "Something went wrong!",
					description: "Could not get product with id " + id + ".",
					variant: "destructive"
				});
			})
	}, [id]);

	if (error) {
		return <h2>Error</h2>;
	}

	return product ? (
		<>
			<p>Id: {product.id}</p>
			<p>Name: {product.name}</p>
			<p>Weight: {product.weightInGrams}</p>
			<p>Price: {product.price} kr.</p>
		</>
	): (
		<h2>Fetching...</h2>
	)
}