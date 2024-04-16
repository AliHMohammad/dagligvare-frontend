
import  { makeOptions,handleHttpErrors } from "./fetchUtils";
import Product from "@/models/Product.ts";


const API_URL = "http://localhost:8080"

const PRODUCTS_URL = API_URL + "/products";
const DELIVERIES_URL = API_URL + "/deliveries";


export type ProductRequest = {
	name: string,
	price: number,
	weightInGrams: number
}

export type DeliveryRequest = {
	delvieryDate: Date,
	fromWarehouse: string,
	destination: string
}


async function getProducts(name?: string): Promise<Product[]> {
	const url = name ? PRODUCTS_URL + `?name=${name}` : PRODUCTS_URL;
	console.log(url);
	return await fetch(url).then(handleHttpErrors);
}

async function deleteProduct(id: number): Promise<Product> {
	const options = makeOptions("DELETE");
	return await fetch(`${PRODUCTS_URL}/${id}`, options).then(handleHttpErrors);
}

async function createProduct(newProduct: ProductRequest): Promise<Product> {
	const options = makeOptions("POST", newProduct);
	return await fetch(`${PRODUCTS_URL}`, options).then(handleHttpErrors);
}

async function updateProduct(updatedProduct: ProductRequest, id: number): Promise<Product> {
	const options = makeOptions("PUT", updatedProduct);
	return await fetch(`${PRODUCTS_URL}/${id}`, options).then(handleHttpErrors);
}

async function getSingleProduct(id: number): Promise<Product> {
	return await fetch(`${PRODUCTS_URL}/${id}`).then(handleHttpErrors);
}

async function getDeliveries() {
	return await fetch(DELIVERIES_URL).then(handleHttpErrors);
}



export {getProducts, deleteProduct, createProduct, updateProduct, getSingleProduct, getDeliveries}