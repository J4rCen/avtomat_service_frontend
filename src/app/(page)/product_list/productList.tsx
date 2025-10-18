'use client'

import { useEffect, useState } from "react"
import productsApi from "@/app/api/productsApi"
import { StateType } from "@/app/store/store"
import Card from "@/app/components/card/Card"
import { useDispatch, useSelector } from "react-redux"
import { setProductList } from '@/app/store/slices/productsSlice'

const ProductList = () => {
    const [loading, setLoading] = useState(true)
    const [sortOrder, setSortOrder] = useState<"asc" | "desc" | "default">("default")
    const productStore = useSelector((state: StateType) => state.product)
    const dispatch = useDispatch()

    useEffect(() => {
        const getProductList = async () => {
            try {
                const data = await productsApi.findAll()
                dispatch(setProductList(data))
            } catch (error) {
                console.error("Ошибка загрузки товаров", error)
            } finally {
                setLoading(false)
            }
        }

        getProductList()
    }, [])

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

    if (loading) {
        return <div className='flex justify-center items-center h-screen'>Загрузка товаров...</div>
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
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full sm:w-auto cursor-pointer"
                >
                    Добавить товар
                </button>
            </div>

            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {
                    sortProducts().map(product => <Card key={product.id} {...product} />)
                }
            </div>
        </div>
    )
}

export default ProductList
