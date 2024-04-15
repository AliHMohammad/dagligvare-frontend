import ProductOrder from "@/models/ProductOrder.ts";


export default interface Delivery {
	id: number,
	deliveryDate: Date,
	fromWarehouse: string,
	destination: string,
}

