
import { createDelivery, DeliveryRequest } from "@/services/apiFacade.ts";
import { useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/use-toast.ts";
import DeliveryForm from "@/components/forms/DeliveryForm.tsx";


export default function DeliveryFormPage() {
	const navigate = useNavigate();
	
	const handleSubmitDeliveryForm = (request: DeliveryRequest) => {
		createDelivery(request)
			.then((newDelivery) => {
				toast({
					title: "Delivery created",
					description: "Delivery to destination " + newDelivery.destination + ".",
				});
				navigate("/deliveries")
			})
			.catch((e: Error) => {
				toast({
					title: "Something went wrong!",
					description: "Could not create new delivery.",
					variant: "destructive"
				});
				console.log(e.message);
			})
	}
	
	return (
		<>
			<DeliveryForm handleSubmitDeliveryForm={handleSubmitDeliveryForm}/>
		</>
	)
}