
import ProductOrder from "@/models/ProductOrder.ts";
import Delivery from "@/models/Delivery.ts";


export default interface DetailedDelivery extends Delivery {
	products: ProductOrder[]
}