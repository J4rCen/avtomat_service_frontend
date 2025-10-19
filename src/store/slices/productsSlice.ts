import IProducts from "@/interfaces/IProducts";
import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import productsApi from "@/api/productsApi";

export const fetchProductListThunk = createAsyncThunk(
	'product/fetchAll',
	async (_, thunkAPI) => {
		try {
			const data = await productsApi.findAll();
			return data;
		} catch (error) {
			return thunkAPI.rejectWithValue('Ошибка при загрузке продуктов');
		}
	}
);

export const createProductThunk = createAsyncThunk(
	'product/create',
	async (product: IProducts, thunkAPI) => {
		try {
			const created = await productsApi.create(product);
			return created?.data;
		} catch (error) {
			return thunkAPI.rejectWithValue('Ошибка при создании продукта');
		}
	}
);

export const updateProductThunk = createAsyncThunk(
	'product/update',
	async ({ id, product }: { id: string; product: Partial<IProducts> }, thunkAPI) => {
		try {
			const updated = await productsApi.update(id, product);
			return updated?.data;
		} catch (error) {
			return thunkAPI.rejectWithValue('Ошибка при обновлении продукта');
		}
	}
);

export const deleteProductThunk = createAsyncThunk(
	'product/delete',
	async (id: string, thunkAPI) => {
		try {
			const remove = await productsApi.remove(id);
			return remove
		} catch (error) {
			return thunkAPI.rejectWithValue('Ошибка при удалении продукта');
		}
	}
);

const initialState: Record<string, IProducts> = {}

const productSlice = createSlice({
	name: 'product',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchProductListThunk.fulfilled, (_, action) => {
				return action.payload;
			})
			.addCase(createProductThunk.fulfilled, (state, action) => {
				const product = action.payload;
				state[product.id] = product;
			})
			.addCase(updateProductThunk.fulfilled, (state, action) => {
				const { id, product } = action.payload;
				if (state[id]) {
					state[id] = { ...state[id], ...product };
				}
			})
			.addCase(deleteProductThunk.fulfilled, (state, action) => {
				delete state[action.payload];
			});
	}
})

export default productSlice.reducer