const { convertCountry } = require('./src/functions/functions');
const {Country} = require('./src/db');
const axios = require('axios')

//acá estaba el buda xd

//  1 )  ME TRAIGO LOS DATOS DE LA API Y LOS CONVIERTO A OBJETO 

const data = async () => {
  try{
    const arr = await axios.get('https://restcountries.eu/rest/v2/all').catch((error) => console.log("error en la api -----------------------------------------------\n", error));
    return arr.data.map( item => convertCountry(item));
  }
  catch (err) {
    console.log("err");
  }
};

//  2 )  TRAIGO LOS DATOS DEL OBJETO CONVERTIDO A LA DB

async function apiToDB(r) {
    try{
          const apiCountries = await data();
          await Country.bulkCreate(apiCountries);
          console.log("Successfull apiToDB");           
        } 
    
    catch (error){
        console.log("error in apiToDB");
    }
}

const path = require('path');
const server = require('./src/app.js');
const { conn } = require('./src/db.js');

const PORT = process.env.PORT || 5000


// Syncing all the models at once.
conn.sync({ force: true }).then( async() => {
  await apiToDB();
  await server.listen(PORT, () => {
    console.log(`%s listening at ${PORT}`); // eslint-disable-line no-console
  });
});
