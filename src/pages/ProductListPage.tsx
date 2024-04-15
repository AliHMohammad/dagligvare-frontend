import { useEffect, useState } from "react";
import Product from "@/models/Product.ts";
import { getProducts } from "@/services/apiFacade.ts";
import ProductList from "@/components/core/ProductList.tsx";
import { Button } from "@/components/ui/button.tsx";
import { useNavigate } from "react-router-dom";


export default function ProductListPage() {
	const navigate = useNavigate();
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
			<div className={"my-3"}>
				<Button  onClick={() => navigate("/add/product")}>New Product</Button>
			</div>
			<ProductList products={products} setProducts={setProducts}/>
		</>
	)
}