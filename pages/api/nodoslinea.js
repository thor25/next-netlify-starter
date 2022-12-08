import Cors from 'cors'
import initMiddleware from '../../lib/init-middleware'

// Initialize the cors middleware
const cors = initMiddleware(
  // You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
  Cors({
    // Only allow requests with GET, POST and OPTIONS
    methods: ['GET', 'POST', 'OPTIONS'], 
  })
)
const urlBase = process.env.URL_BASE
const headers = {
  
    //headers.append('Content-Type', 'text/json');
    'Authorization': process.env.AUTHENTICATION,
    "content-type": "application/json",
    "deviceid": "0b525b54-dcc5-11ea-87d0-0242ac130003",
    "cache-control": "no-cache"
    }
 
export default async function handler(req, res) {
    console.log("🚀 ~ file: nodoslinea.js ~ line 13 ~ handler ~ req", req)
    console.log(req.query)
    var linea = req.query.linea
    var sentido = 1
    var url = `${urlBase}nodosLinea/${linea}?sentido=${sentido}`
    var valor  = {"linea":linea,"sentido":[]};

    console.log(url)
    await cors(req,res)
    await fetch( `${urlBase}nodosLinea/${linea}?sentido=${sentido}`, {
      method: 'get',
      headers: headers,
    })      
      .then(response => response.json())
      .then(data => {
       if (data!=null)
       {
         valor.sentido.push({"paradas":[]})
        //console.log(data)
         data.forEach(dato=>{
           valor.sentido[0].paradas.push({'codigo':dato.codigo,'descripcion':dato.descripcion.texto})
         })
          
       }
      }
      ).catch(function (e) {
        //  alert("error en datos de tussam")
         console.error(e);
       });
       sentido = 2
       console.log( `${urlBase}nodosLinea/${linea}?sentido=${sentido}`)
       await fetch( `${urlBase}nodosLinea/${linea}?sentido=${sentido}`, {
         method: 'get',
         headers: headers,
         //   credentials: 'infotus-usermobile:2infotus0user1mobile2'
       })      
         .then(response => response.json())
         .then(data => {
          if (data!=null)
          {
            if (data!=null)
       {
         valor.sentido.push({"paradas":[]})
        //console.log(data)
         data.forEach(dato=>{
           valor.sentido[1].paradas.push({'codigo':dato.codigo,'descripcion':dato.descripcion.texto})
         })
          
       }
             
          }
         }
         ).catch(function (e) {
           //  alert("error en datos de tussam")
            console.error(e);
          });
    console.log("valor",valor)
    res.status(200).json({ datos: valor })

  }