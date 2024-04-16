import ProductForm from "@/components/forms/ProductForm.tsx";
import { createProduct, ProductRequest, updateProduct } from "@/services/apiFacade.ts";
import { useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/use-toast.ts";


export default function ProductFormPage() {
	const navigate = useNavigate();

	const handleSubmitForm = (productRequest: ProductRequest, id: number | null) => {
		id ?
			updateProduct(productRequest, id)
				.then((p) => {
					toast({
						title: "product updated!",
						description: p.name + " has been updated.",
					});
					//TODO: Skal måske ændres
					setTimeout(() => {
						navigate("/products")
					}, 500)
				})
				.catch((e: Error) => {
					toast({
						title: "Something went wrong!",
						description: "Could not update " + productRequest.name + ".",
						variant: "destructive"
					});
					console.log(e.message);
				})
			: createProduct(productRequest)
				.then((p) => {
					toast({
						title: "product created!",
						description: p.name + " has been created.",
					});
					//TODO: Skal måske ændres
					setTimeout(() => {
						navigate("/products")
					}, 500)
				})
				.catch((e: Error) => {
					toast({
						title: "Something went wrong!",
						description: "Could not create " + productRequest.name + ".",
						variant: "destructive"
					});
					console.log(e.message);
				})
	}


	return (
		<>
			<ProductForm handleSubmitForm={handleSubmitForm}/>
		</>
	)
}