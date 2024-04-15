import { useEffect, useState } from "react";
import Product from "@/models/Product.ts";
import { getProducts } from "@/services/apiFacade.ts";
import ProductList from "@/components/core/ProductList.tsx";


export default function ProductListPage() {
	const [products, setProducts] = useState<Product[]>([]);

	useEffect( () => {
		getProducts()
			.then((p) => {
				setProducts(p);
			})
			.catch((e: Error) => {
				console.log(e.message);
			})
	}, []);


	return (
		<>
			<h1 className={"text-center"}>Products</h1>
			<ProductList products={products} setProducts={setProducts}/>

		</>
	)
}