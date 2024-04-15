import PageLayout from "@/components/layouts/PageLayout.tsx";
import { Route, Routes } from "react-router-dom";
import ProductListPage from "@/pages/ProductListPage.tsx";
import { Toaster } from "@/components/ui/toaster.tsx";
import ProductForm from "@/components/forms/ProductForm.tsx";


function App() {
	return (
		<>
			<PageLayout>
                <Routes>
					<Route path="/" element={<ProductListPage/>}/>
					<Route path="/add/product" element={<ProductForm/>}/>
					<Route path="/deliveries" element={<h2>Deliveries List</h2>}/>
				</Routes>
			</PageLayout>
			<Toaster/>
		</>
	);
}

export default App;
