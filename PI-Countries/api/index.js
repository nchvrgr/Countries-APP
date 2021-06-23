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

async function apiToDB() {
	let empty = Country.count();
    try{
        if (empty) {
            const apiCountries = await data();
            await Country.bulkCreate(apiCountries);
            console.log("Successfull apiToDB");           
        } else {
            next({ status: 404, message: 'Something went wrong' });
        }
    }
    catch (error){
        console.log("error in apiToDB");
    }
}

apiToDB();


const server = require('./src/app.js');
const { conn } = require('./src/db.js');

// Syncing all the models at once.
conn.sync({ force: true }).then(() => {
  server.listen(3001, () => {
    console.log('%s listening at 3001'); // eslint-disable-line no-console
  });
});
