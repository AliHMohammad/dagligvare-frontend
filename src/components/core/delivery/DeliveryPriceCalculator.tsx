import Product from "@/models/Product.ts";
import { SavedProducts } from "@/types.ts";
import { useEffect, useState } from "react";


type Props = {
	products: SavedProducts[]
}

export default function DeliveryPriceCalculator({products}: Props) {
	const [total, setTotal] = useState("");


	useEffect(() => {
		const sumTotal = products.reduce((acc, item) => {
			return (item.product.price * item.quantity) + acc
		}, 0)

		setTotal(String(sumTotal));
	}, [products]);


	return (
		<>
			<div>
				Delivery Details:
				<div>
					<ol>
						{products.map((p) => <li key={p.product.id}>{p.product.name}, {p.quantity} stk.</li>)}
					</ol>
				</div>
				<div>
					<p>Total Price:</p>
					<p>{total ? `${total},00` : "0,00"}</p>
				</div>
			</div>
		</>
	)

}