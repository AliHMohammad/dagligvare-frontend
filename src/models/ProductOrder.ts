import Product from "@/models/Product.ts";


export default interface ProductOrder {
	quantity: number,
	product: Product
}