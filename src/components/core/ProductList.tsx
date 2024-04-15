import Product from "@/models/Product.ts";
import ProductListItem from "@/components/core/ProductListItem.tsx";


type Props = {
	products: Product[]
}

export default function ProductList({ products }: Props) {


	return (
		<>
			{products.length ?
				<div className={"flex flex-wrap  gap-10"}>
					{products.map(p => <ProductListItem product={p} />)}
				</div> :
				<h2>Fetching...</h2>}
		</>
	);
}