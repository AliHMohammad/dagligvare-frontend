import DeliveryForm from "@/components/forms/DeliveryForm.tsx";
import { DeliveryRequest } from "@/services/apiFacade.ts";


export default function DeliveryFormPage() {
	
	
	const handleSubmitForm = (request: DeliveryRequest) => {
		//TODO: Kald POST DELIVERY
	}
	
	return (
		<>
			<DeliveryForm handleSubmitForm={handleSubmitForm}/>
		</>
	)
}