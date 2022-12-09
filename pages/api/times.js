
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
const url = process.env.URL_BASE+"tiempos/"
console.log("URL:", url)
export default async function handler(req, res) {
    var llegadas = []
    await cors(req,res)
    // var url ="https://reddelineas.tussam.es/API/infotus-ui/tiempos/"
    await fetch(url+"218", {
      "headers": {
        "accept": "application/json, text/javascript, */*; q=0.01",
    
      },
      "body": null,
      "method": "GET"
    })  .then(response => response.json())
    .then(data => {
     if (data!=null)
     {
      console.log(data)   
      var valor = data.result.lineasCoincidentes
      console.log(valor)
      valor.forEach(dato => {
//        console.log(dato)
        dato.estimaciones.forEach(bus  =>{
          console.log(bus)
            llegadas.push ({distancia:bus.distancia, tiempo:bus.segundos})
          })
        
      });
     }
    }
    ).catch(function (e) {
      //  alert("error en datos de tussam")
       console.error(e);
     });
    
  res.status(200).json({valor : llegadas})
  //  res.status(200).json({ datos: grupos })
  }

