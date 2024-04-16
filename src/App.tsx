import PageLayout from "@/components/layouts/PageLayout.tsx";
import { Route, Routes } from "react-router-dom";
import ProductListPage from "@/pages/ProductListPage.tsx";
import { Toaster } from "@/components/ui/toaster.tsx";
import ProductFormPage from "@/pages/ProductFormPage.tsx";
import DetailedProductPage from "@/pages/DetailedProductPage.tsx";
import DeliveriesListPage from "@/pages/DeliveriesListPage.tsx";
import DeliveryForm from "@/components/forms/DeliveryForm.tsx";


function App() {
	return (
		<>
			<PageLayout>
                <Routes>
					<Route path="/" element={<h1>Home</h1>}/>
					<Route path="/products" >
						<Route index element={<ProductListPage/>}/>
						<Route path=":id" element={<DetailedProductPage/>}/>
					</Route>
					<Route path="/add/product" element={<ProductFormPage/>}/>
					<Route path="/add/delivery" element={<DeliveryForm/>}/>
					<Route path="/deliveries" element={<DeliveriesListPage/>}/>
					<Route path="/vans" element={<h2>Vans</h2>}/>
				</Routes>
			</PageLayout>
			<Toaster/>
		</>
	);
}

export default App;
