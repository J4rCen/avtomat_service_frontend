'use client'

import IProducts from "@/interfaces/IProducts"
import { useRouter } from "next/navigation"

interface ICard extends IProducts {
    sample?: boolean
}

const Card = (props: ICard) => {
    const router = useRouter()

    return (
        <div 
            onClick={() => props.sample ? null : router.push(`/edit/${props.id}`)}
            className={`flex flex-col border border-gray-300 bg-white rounded-md overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 ${props.sample ? '' : 'cursor-pointer'} w-72 h-[400px]`}
            id={props.id}
        >
            <div className="h-48 w-full overflow-hidden flex items-center justify-center bg-gray-100">
                <img
                    className="object-cover w-full h-full"
                    src={props.image}
                    alt={props.title}
                />
            </div>

            <div className="p-4 flex flex-col gap-2 text-sm flex-1 overflow-hidden">
                <h2 className="font-semibold text-lg truncate">{props.title}</h2>
                <p className="text-gray-700 font-bold">{props.price} ₽</p>
                <p className="text-gray-500 text-sm overflow-hidden text-ellipsis line-clamp-2">
                    {props.description}
                </p>
                <span className="text-xs text-gray-400 mt-auto truncate">{props.category}</span>
            </div>
        </div>
    )
}

export default Card
