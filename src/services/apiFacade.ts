
import  { makeOptions,handleHttpErrors } from "./fetchUtils";
import Product from "@/models/Product.ts";


const API_URL = "http://localhost:8080"

const PRODUCTS_URL = API_URL + "/products"




/*
async function deleteRecipe(id: number): Promise<Recipe> {
 const options = makeOptions("DELETE", null, true);
 return fetch(`${RECIPE_URL}/${id}`, options).then(handleHttpErrors);
 }
}*/


async function getProducts(name?: string): Promise<Product[]> {
	const url = name ? PRODUCTS_URL + `?name=${name}` : PRODUCTS_URL;
	console.log(url);
	return await fetch(url).then(handleHttpErrors);
}

async function deleteProduct(id: number): Promise<Product> {
	const options = makeOptions("DELETE");
	return await fetch(`${PRODUCTS_URL}/${id}`, options).then(handleHttpErrors);
}



export {getProducts, deleteProduct}