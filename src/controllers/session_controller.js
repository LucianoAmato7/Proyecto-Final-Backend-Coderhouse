import passport from "passport";
import { upload } from "../../config/multer_config.js";
import session_repository from "../repository/session_repository.js";
import { logger } from "../../config/winston_config.js";

export const Login_Render_controller = (req, res) => {
  try{
    res.render("login");
  }catch(err){
    logger.error(`Error en Login_Render_controller: ${err}`);
    res.status(500).json({ error: "Error en el servidor" });
  }
};

export const Login_Authenticate_controller = (req, res, next) => {
  passport.authenticate("login", (err, access_token) => {
    if (err) {
      logger.error(`Error en la autenticación de login (controller): ${err}`);
      return (
        res.redirect("/session/faillogin")
      );
    }
    if (!access_token) {
      return (
        res.redirect("/session/faillogin")
      );
    }
    res.cookie('token', access_token, { expires: new Date(Date.now() + 600000) });
    return res.redirect("/");
  })(req, res, next);
};

export const Register_Render_controller = (req, res) => {
  try{
    res.render("register");
  }catch(err){
    logger.error(`Error en Register_Render_controller: ${err}`);
    res.status(500).json({ error: "Error en el servidor" });
  }
};

export const Register_Authenticate_controller = (req, res, next) => {
  upload.single("image")(req, res, () => {
    passport.authenticate("register", (err, access_token) => {
      if (err) {
        logger.error(`Error en Register_Authenticate_controller: ${err}`)
        return res.redirect("/session/failregister");
      }
      if(!access_token){
        return res.redirect("/session/failregister");
      }
      req.session.destroy((error) => {
        if (error) {
          logger.error(`Error al destruir la sesión: ${error}`);
          return
        }
      });
      res.redirect("/session/login");
    })(req, res, next);
  });
};

export const Login_Fail_controller = (req, res) => {
  try{
    res.render("failLogin");
  }catch(err){
    logger.error(`Error en Login_Fail_controller: ${err}`);
    res.status(500).json({ error: "Error en el servidor" });
  }
};

export const Register_Fail_controller = (req, res) => {
  try{
    res.render("failRegister");
  }catch(err){
    logger.error(`Error en Register_Fail_controller: ${err}`);
    res.status(500).json({ error: "Error en el servidor" });
  }
};

export const Logout_controller = (req, res) => {
  try{
    const user = req.session.user;
    req.session.destroy((error) => {
      if (error) {
        logger.error(`Error al destruir la sesión: ${error}`);
        return res.status(500).json({ error: "Error en el servidor" });
      } else {
        res.clearCookie('token');
        res.render("logout", { user });
      }
    });
  }catch(err){
    logger.error(`Error en Logout_controller: ${err}`);
    res.status(500).json({ error: "Error en el servidor" });
  }
};

export const FindUser_controller = async (email) => {
  try{
    const user = await session_repository.findOne(email);
    return user;
  }catch(err){
    logger.error(`Error en FindUser_controller: ${err}`);
  }
};

export const SaveUser_controller = async (userData) => {
  try{
    await session_repository.save(userData);
  }catch(err){
    logger.error(`Error en SaveUser_controller: ${err}`);
  }
};
