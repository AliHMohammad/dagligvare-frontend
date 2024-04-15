import { Dispatch, SetStateAction, useEffect, useState } from "react";
import Product from "@/models/Product.ts";
import { getProducts } from "@/services/apiFacade.ts";
import ProductList from "@/components/core/ProductList.tsx";
import { Button } from "@/components/ui/button.tsx";
import { useNavigate } from "react-router-dom";
import SearchBar from "@/components/core/SearchBar.tsx";


export default function ProductListPage() {
	const navigate = useNavigate();
	const [products, setProducts] = useState<Product[] | null>(null);
	const [searchValue, setSearchValue] = useState("");

	useEffect( () => {
		getProducts(searchValue)
			.then((p) => {
				setProducts(p);
			})
			.catch((e: Error) => {
				console.log(e.message);
			})
	}, [searchValue]);

	const handleChange = (newSearchValue: string) => {
		setSearchValue(newSearchValue);
	}

	const handleReset = () => {
		setSearchValue("");

	}


	return (
		<>
			<h1 className={"text-center"}>Products</h1>
			<div className={"my-6 flex flex-wrap justify-center gap-4 px-8 sm:justify-between"}>
				<SearchBar value={searchValue} handleChange={handleChange} handleReset={handleReset}/>
				<Button  onClick={() => navigate("/add/product")}>New Product</Button>
			</div>
			{products ? <ProductList products={products} setProducts={setProducts as Dispatch<SetStateAction<Product[]>>}/> : <h2>Fetching...</h2>}
		</>
	)
}