import products_repository from "../repository/products_repository.js";
import { logger } from "../../config/winston_config.js";

export const GetProds_controller = async (req, res) => {
  try {
    const productos = await products_repository.find();
    res.json(productos);
  } catch (err) {
    const errorMessage = "Error al listar los productos.";
    logger.error(`En el CONTROLLER GetProds_controller: ${errorMessage}`, err);
    res.status(500).json({ error: errorMessage });
  }
};

export const GetProdsByID_controller = async (req, res) => {
  try {
    let { id } = req.params;
    const producto = await products_repository.findByID(id);
    res.json(producto);
  } catch (err) {
    const errorMessage = "Error al obtener el producto.";
    logger.error(
      `En el CONTROLLER GetProdsByID_controller: ${errorMessage}`,
      err
    );
    res.status(500).json({ error: errorMessage });
  }
};

export const CreateProd_controller = async (req, res) => {
  try {
    const data = req.body;
    const result = await products_repository.save(data);

    if (result.code === 409) {
      return res.status(409).json(result);
    }

    return res.json(result);
  } catch (err) {
    const errorMessage = "Error al crear el producto.";
    logger.error(
      `En el CONTROLLER CreateProd_controller: ${errorMessage}`,
      err
    );
    res.status(500).json({ error: errorMessage });
  }
};

export const UpdateProd_controller = async (req, res) => {
  try {
    const data = req.body;
    const { id } = req.params;
    const prodUpdate = await products_repository.update(id, data);
    res.json(prodUpdate);
  } catch (err) {
    const errorMessage = "Error al actualizar el producto.";
    logger.error(
      `En el CONTROLLER UpdateProd_controller: ${errorMessage}`,
      err
    );
    res.status(500).json({ error: errorMessage });
  }
};

export const DeleteProd_controller = async (req, res) => {
  let { id } = req.params;
  try {
    const result = await products_repository.delete(id);
    return res.json(result);
  } catch (err) {
    const errorMessage = "Error al eliminar el producto.";
    logger.error(
      `En el CONTROLLER DeleteProd_controller: ${errorMessage}`,
      err
    );
    res.status(500).json({ error: errorMessage });
  }
};
