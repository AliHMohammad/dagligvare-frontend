import Product from "@/models/Product.ts";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button.tsx";
import { deleteProduct } from "@/services/apiFacade.ts";


type Props = {
	product: Product
	handleDelete: (productId: number) => void;
}

export default function ProductListItem({product, handleDelete}: Props) {
	const navigate = useNavigate();



	return (
		<div className={"min-w-56 bg-green-500 px-4"}>
			<div className={"flex flex-col items-center"}>
				<h2>{product.name}</h2>
				<h2>{product.price} kr.</h2>
			</div>

			<div className={"flex justify-between"}>
				<Button>
					Edit
				</Button>
				<Button onClick={() => handleDelete(product.id)}>
					Delete
				</Button>
			</div>
		</div>
	)
}