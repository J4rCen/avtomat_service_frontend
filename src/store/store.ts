import { configureStore} from "@reduxjs/toolkit";
import productReducer from './slices/productsSlice'

export const store = configureStore({
    reducer: {
        product: productReducer
    }
})

export type StateType = ReturnType<typeof store.getState>
export type DispatchType = typeof store.dispatch