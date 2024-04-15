import PageLayout from "@/components/layouts/PageLayout.tsx";
import { Route, Routes } from "react-router-dom";
import ProductListPage from "@/pages/ProductListPage.tsx";
import { Toaster } from "@/components/ui/toaster.tsx";


function App() {
	return (
		<>
			<PageLayout>
                <Routes>
					<Route path="/" element={<ProductListPage/>}/>
				</Routes>
			</PageLayout>
			<Toaster/>
		</>
	);
}

export default App;
