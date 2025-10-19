import IProducts from "@/interfaces/IProducts"
import axios from "axios"

class ProductApi {
    private baseUrl = 'http://localhost:3001/api/products'

    async findAll() {
        try {
            const product = await axios.get(this.baseUrl)
            return product.data
        } catch (error) {
            console.error(error)
        }
    }

    async findOne(id: string) {
        try {
            const product = await axios.get(this.baseUrl + `/${id}`)
            return product.data
        } catch (error) {
            
        }
    }

    async create(productList: IProducts) {
        try {
            const create = await axios.post(this.baseUrl, productList)
            return create
        } catch (error) {
            
        }
    }

    async update(id: string, productList: Partial<IProducts>) {
        try {
            const update = await axios.put(this.baseUrl + `/${id}`, productList)
            return update
        } catch (error) {
            
        }
    }

    async remove(id: string) {
        try {
            const remove = await axios.delete(this.baseUrl + `/${id}`)
            return remove.data
        } catch (error) {
            
        }
    }
}

export default new ProductApi