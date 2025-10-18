'use client'

import { Provider } from "react-redux";
import { store } from "./store/store";
import ProductList from "./(page)/product_list/productList";

export default function Home() {
	return (
		<Provider store={store}>
			<ProductList/>
		</Provider>
	);
}
