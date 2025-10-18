import IProducts from "@/app/interfaces/IProducts"

const Card = (props: IProducts) => {
    return (
        <div 
            className="flex flex-col border border-gray-300 bg-white rounded-md overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 cursor-pointer"
            id={props.id}
        >
            <div className="h-48 w-full overflow-hidden flex items-center justify-center bg-gray-100">
                <img
                    className="object-container h-full max-h-full"
                    src={props.image}
                    alt={props.title}
                />
            </div>
            <div className="p-4 flex flex-col gap-2 text-sm">
                <h2 className="font-semibold text-lg truncate">{props.title}</h2>
                <p className="text-gray-700 font-bold">{props.price} ₽</p>
                <p className="text-gray-500 line-clamp-2">{props.description}</p>
                <span className="text-xs text-gray-400">{props.category}</span>
            </div>
        </div>
    )
}

export default Card