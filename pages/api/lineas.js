
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
console.log("🚀 ~ file: lineas.js ~ line 2 ~ urlBase", urlBase)
const headers = {
  
    //headers.append('Content-Type', 'text/json');
    'Authorization': process.env.AUTHENTICATION,
    "content-type": "application/json",
    "deviceid": "0b525b54-dcc5-11ea-87d0-0242ac130003",
    "cache-control": "no-cache"
    }
  
export default async function handler(req, res) {
    await cors(req,res)
    var valor = []
    await fetch( urlBase+"lineas/todas", {
      method: 'get',
      headers: headers,
      
    })      
      .then(response => response.json())
      .then(data => {
       if (data!=null)
       {
        data.forEach(dato=>{
            valor.push({'key':dato.linea,'nombre':dato.labelLinea + ".-"  + dato.descripcion.texto})
          })     
          
       }
      }
      ).catch(function (e) {
        //  alert("error en datos de tussam")
         console.error(e);
       });
      
       console.log("🚀 ~ file: lineas.js ~ line 43 ~ handler ~ valor", valor)
       res.status(200).json({ datos: valor })

  }