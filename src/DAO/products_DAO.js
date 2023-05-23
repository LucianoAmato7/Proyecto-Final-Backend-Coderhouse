import { prods_Model } from "../models/product_model.js";
import { logger } from "../../config/winston_config.js";

class ProductsDaoMongoDB {
  constructor() {
    this.model = prods_Model;
  }

  async GetProds() {
    try {
      let data = await this.model.find({});
      return data;
    } catch (error) {
      logger.error(`Error en operacion de base de datos: ${error}`);
      return { error: "Error en operacion de base de datos" };
    }
  }

  async ListById(id) {
    try {
      const data = await this.model.findById(id);
      return data;
    } catch (error) {
      logger.error(`Error al lista producto por ID: ${error}`);
      return { error: `Error al lista producto por ID: ${error}` };
    }
  }

  //crea un producto. Recibe title, brand, price, thumbnail y stock.
  async CreateProd(prodtoAdd) {
    try {
      const existingProduct = await this.model.findOne({
        title: prodtoAdd.title,
      });

      if (existingProduct) {
        logger.info(`Ya existe un producto con el título ${prodtoAdd.title}`);
        return {
          code: 409,
          message: `Ya existe un producto con el título ${prodtoAdd.title}`,
        };
      }

      const newProd = new this.model(prodtoAdd);
      await newProd.save();
      console.log("Producto creado con exito");
      return prodtoAdd;
    } catch (error) {
      logger.error(`Error en la creacion del producto: ${error}`);
      return { error: `Error en la creacion del producto: ${error}` };
    }
  }

  async UpdateProd(id, obj) {
    try {
      await this.model.updateOne({ _id: id }, obj);
      const prods = await this.model.find({});
      logger.info("Producto actualizado");
      return prods;
    } catch (error) {
      logger.error(`Error al actualizar producto: ${error}`);
      return { error: "Error en la actualización del producto" };
    }
  }

  async DeleteProd(id) {
    try {
      await this.model.deleteOne({ _id: id });
      logger.info(`Objeto con id: ${id}, ha sido eliminado con exito`);
      return await this.model.find({});
    } catch (error) {
      logger.error(`Error en la API de productos: ${error}`);
      return { Error: "Error en la eliminación del objeto" };
    }
  }
}

export default ProductsDaoMongoDB;
