import IProducts from "@/app/interfaces/IProducts";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

const initialState: Record<string, IProducts> = {}

const productSlice = createSlice({
	name: 'product',
	initialState,
	reducers: {
		setProductList: (_, actions: PayloadAction<Record<string, IProducts>>) => {
			return actions.payload
		}
	}
})

export const {setProductList} = productSlice.actions
export default productSlice.reducer