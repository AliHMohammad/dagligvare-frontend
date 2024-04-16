import Product from "@/models/Product.ts";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button.tsx";



type Props = {
	product: Product
	handleDelete: (product: Product) => void;
}

export default function ProductListItem({product, handleDelete}: Props) {
	const navigate = useNavigate();

	const handleClick = () => {
		navigate(`${product.id}`)
	}

	return (
		<div className={"min-w-56 bg-green-500 p-4 flex flex-col gap-10 "} >
			<div className={"flex flex-col items-center"}>
				<h2 className={"cursor-pointer font-bold"} onClick={() => handleClick()} >{product.name}</h2>
				<h2>{product.price} kr.</h2>
			</div>

			<div className={"flex justify-between"}>
				<Link to={"/add/product"} state={product}>
					<Button>
						Edit
					</Button>
				</Link>
				<Button onClick={() => handleDelete(product)}>
					Delete
				</Button>
			</div>
		</div>
	)
}