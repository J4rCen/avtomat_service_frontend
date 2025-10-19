'use client'

import { useEffect, useState } from "react"
import { DispatchType, StateType } from "@/store/store"
import Card from "@/components/card/Card"
import { useDispatch, useSelector } from "react-redux"
import { useRouter } from "next/navigation"
import { fetchProductListThunk } from "@/store/slices/productsSlice"

const ProductList = () => {
    const router = useRouter()
    const [sortOrder, setSortOrder] = useState<"asc" | "desc" | "default">("default")
    const productStore = useSelector((state: StateType) => state.product)
    const dispatch = useDispatch<DispatchType>()

    useEffect(() => {
        dispatch(fetchProductListThunk());
    }, []);

    const sortProducts = () => {
        const productsArray = Object.values(productStore)

        if (sortOrder === "asc") {
            return [...productsArray].sort((a, b) => a.price - b.price)
        } else if (sortOrder === "desc") {
            return [...productsArray].sort((a, b) => b.price - a.price)
        }

        return productsArray
    }

    const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSortOrder(e.target.value as "asc" | "desc" | "default")
    }

    return (
        <div className='container mx-auto px-4 py-8'>
            <div className="flex flex-col sm:flex-row sm:justify-end gap-4 sm:gap-6 mb-6">
                <select
                    value={sortOrder}
                    onChange={handleSortChange}
                    className="border rounded px-4 py-2 w-full sm:w-auto cursor-pointer"
                >
                    <option value="default">Без сортировки</option>
                    <option value="asc">По цене: по возрастанию</option>
                    <option value="desc">По цене: по убыванию</option>
                </select>
                <button
                    onClick={() => router.push('/edit/new')}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full sm:w-auto cursor-pointer"
                >
                    Добавить товар
                </button>
            </div>

            <div className="grid justify-items-center gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {
                    sortProducts().map(product => <Card key={product.id} {...product} />)
                }
            </div>
        </div>
    )
}

export default ProductList
