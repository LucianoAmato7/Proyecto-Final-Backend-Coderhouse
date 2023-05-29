import { server } from "../server.js";

export const Home_controller = async (req, res) => {
  req.session.cookie.expires = new Date(Date.now() + 600000);

  let user = req.session.user;

  //BOOLEANO PARA LA URL DE LA IMAGEN DEL AVATAR, YA QUE DEPENDERA DEL HOST (LOCAL O REMOTO).
  let hostBoolean = req.hostname == "localhost" ? true : false;

  let url = {
    protocol: req.protocol,
    host: req.hostname,
    port: server.address().port,
    hostBoolean,
  };

  let toRender = Object.assign({}, user, url);

  res.render("inicio", { toRender });
};
