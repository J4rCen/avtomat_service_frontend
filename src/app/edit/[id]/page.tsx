'use client'
import { useParams, useRouter } from "next/navigation"
import Card from "@/components/card/Card";
import { useDispatch, useSelector } from "react-redux";
import { nanoid } from "nanoid";
import { DispatchType, StateType } from "@/store/store";
import { useEffect, useState } from "react";
import IProducts from "@/interfaces/IProducts";
import {createProductThunk, updateProductThunk, deleteProductThunk } from '@/store/slices/productsSlice'

const Edit = () => {

    const { id } = useParams();
    const router = useRouter()
    const isNew = id === 'new'
    const product = isNew ? null : useSelector((state: StateType) => state.product[`${id}`])
    const dispatch = useDispatch<DispatchType>()

    const [productId] = useState<string>(isNew ? '' : product?.id as string)
    const [productTitle, setProductTitle] = useState<string>(isNew ? '' : product?.title as string)
    const [productPrice, setProductPrice] = useState<number>(isNew ? 0 : product?.price as number)
    const [productDescriptions, setProductDescriptions] = useState<string>(isNew ? '' : product?.description as string)
    const [productImage, setProductImage] = useState<string>(isNew ? '' : product?.image as string)
    const [productCategory, setProductCategory] = useState<string>(isNew ? '' : product?.category as string)
    const [statusResponse, setStatusResponse] = useState<string>()
    const [showAlert, setShowAlert] = useState<boolean>(false)

    const createNewProduct = async () => { 

        const newProduct: IProducts = {
            id: nanoid(),
            title: productTitle,
            price: productPrice,
            description: productDescriptions,
            image: productImage,
            category: productCategory
        }

        const s = (await dispatch(createProductThunk(newProduct))).payload

        console.log(s)

        if (s.statusCode === 200) {
            setStatusResponse(s.message)
            setShowAlert(true)
        }
    }

    const updateProduct = async () => {
        const updateProduct: IProducts = {
            id: productId,
            title: productTitle,
            price: productPrice,
            description: productDescriptions,
            image: productImage,
            category: productCategory
        }

        const s = (await dispatch(updateProductThunk({id: productId, product: updateProduct}))).payload

        if (s.statusCode === 200) {
            setStatusResponse(s.message)
            setShowAlert(true)
        }
        
    }

    const removeProduct = async () => {
        if (typeof id === 'string' && !isNew) {
            const s = await (await dispatch(deleteProductThunk(id))).payload

            if (s.statusCode === 200) {
                router.back()
            }
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            
            <div className="flex flex-col sm:flex-row sm:justify-end gap-4 sm:gap-6">
                <div className="flex flex-col gap-2">
                    <Card
                        sample
                        id={productId}
                        title={productTitle}
                        price={productPrice}
                        description={productDescriptions}
                        image={productImage ? productImage : '/400.svg'}
                        category={productCategory}
                    />
                    {
                        showAlert && 
                        <div className="flex items-center p-4 mb-4 text-sm text-green-800 border border-green-300 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400 dark:border-green-800" role="alert">
                            <span className="font-medium">{statusResponse}</span>
                        </div>
                    }
                </div>
                <div className="flex flex-col gap-6 w-full max-w-md">
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col">
                            <label className="mb-1 text-sm font-medium">Название</label>
                            <input
                                type="text"
                                value={productTitle}
                                onChange={el => setProductTitle(el.target.value)}
                                className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="mb-1 text-sm font-medium">Цена</label>
                            <input
                                type="number"
                                value={productPrice}
                                onChange={el => setProductPrice(Number(el.target.value))}
                                className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="mb-1 text-sm font-medium">Описание</label>
                            <input
                                type="text"
                                value={productDescriptions}
                                onChange={el => setProductDescriptions(el.target.value)}
                                className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="mb-1 text-sm font-medium">Ссылка на изображение</label>
                            <input
                                type="text"
                                value={productImage}
                                onChange={el => setProductImage(el.target.value)}
                                className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="mb-1 text-sm font-medium">Категория</label>
                            <input
                                type="text"
                                value={productCategory}
                                onChange={el => setProductCategory(el.target.value)}
                                className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>

                    <div className="flex flex-col gap-5">
                        {
                            isNew ? (
                                <button 
                                    onClick={() => createNewProduct()}
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full cursor-pointer"
                                >
                                    Создать
                                </button>
                            ) : (
                                <div className="flex gap-4">
                                    <button
                                        onClick={() => updateProduct()} 
                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full cursor-pointer"
                                    >
                                        Сохранить
                                    </button>
                                    <button 
                                        onClick={() => removeProduct()}
                                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded w-full cursor-pointer"
                                    >
                                        Удалить
                                    </button>
                                </div>
                            )
                        }
                        <button 
                            onClick={() => router.back()}
                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded w-full cursor-pointer"
                        >
                            Отмена
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )

}


export default Edit