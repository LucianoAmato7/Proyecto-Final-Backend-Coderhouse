import products_repository from "../repository/products_repository.js"

//AGREGAR CONTROLLERS

export const GetProds_controller = async (req, res) => {
  const productos = await products_repository.find();
  res.json(productos);
};

export const CreateProd_controller = async (req, res) => {
  try{
    const data = req.body
    const result = await products_repository.save(data)

    if (result.code === 409) {
      return res.status(409).json(result);
    }

    return res.json(result)
  }catch(err){
    console.log(err);
  }
}

export const DeleteProd_controller = async (req, res) => {
  let {id} = req.params;
  try{
    const result = await products_repository.delete(id)
    return res.json(result)
  }catch(err){
    console.log(err);
  }
}