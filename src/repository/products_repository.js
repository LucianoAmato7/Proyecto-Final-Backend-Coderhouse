import ProductsFactory from "../factory/products_factory.js"
import { productDTO } from "../DTO/product_DTO.js"

class products_repository{
    constructor () {
        this.productsDAO = ProductsFactory.getDAO();
    }

    async find(){
        const productos = await this.productsDAO.GetProds();  
        return productos
    }

    async save(data){
        const prodToAdd = productDTO(data)
        const addedProd = await this.productsDAO.CreateProd(prodToAdd)
        return addedProd
    }

    async delete(id){
        const deletedProd = await this.productsDAO.DeleteProd(id)
        return deletedProd
    }
}

export default new products_repository()