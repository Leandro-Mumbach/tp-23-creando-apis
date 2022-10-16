const db = require("../database/models");
const sequelize = db.sequelize;
/* const {Op}= require('sequelize') */

const genresController = {
  list: async (req, res) => {  
    try {
        let{order} = req.query
        let orders = ['name','ranking']
        if(orders.includes(order)){
            order = order ? order : 'id'
        }else {
            throw new Error('El campo ${order} no existe')
        }
      let genres = await db.Genre.findAll({
        order: [order],
        attribute : {
            exclude : ['create_at', 'update_at']
        }
      });
      if (genres.length) {
        return res.status(200).json({
          ok: true,
          meta : { total : genres.length},
          data : genres,
        });
      }
      throw new Error({
        ok: false,
        message: "Hubo un error",
      });
    } catch (error) {
      console.log(error)
      return res.status(500).json({
        ok : false,
        msg : error.message ? error.message : 'Comuniquese con el admin del sitio'
      })
    }
  },

  detail: async(req, res) => {
try {
  const {id} = req.params
  if(isNaN(id)){
    throw new Error('El ID debe ser un nùmero')
  }
  let genre = await db.Genre.findByPk(id, {
    attribute : {
      exclude : ['created_at', 'upgated_at']
    }
  })
  if (genre){
    return res.status(200).json({
      ok : true,
      meta : {total : 1},
      data : genre
    })
  }
  throw new Error('Upps, no se encuentra el género')
}
  catch(error){
    console.log(error)
    return res.status(500).json({
      ok : false,
      msg : error.message ? error.message : 'Comuniquese con el administrador del sitio'
    })
  }

    /* db.Genre.findByPk(req.params.id)
      .then((genre) => {
        res.render("genresDetail.ejs", { genre });
      })
      .catch((error) => console.log(error)); */
  },
};

module.exports = genresController;
