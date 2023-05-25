import { logger } from "../../config/winston_config.js"

export const CreateOrder_controller = async (req, res) => {
    try{
        let { idCart } = req.params;
        let { idUser } = req.params;
      
        //MODIFICAR (HACER UN DAO SEPARADO)
        cartDaoMongoDB.NewOrder(idUser, idCart).then((data) => {
          res.json(data);
        });
    }catch(err){
        logger.error(err)
    }
}

export const UserOrders = async (req, res) => {
    try{

        const {idUser} = req.params;

        

    }catch(err){

    }
}