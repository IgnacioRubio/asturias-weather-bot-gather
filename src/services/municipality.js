const request = require('superagent');
require('superagent-charset')(request);

const mine = ['text/plain'];
request.buffer[mine] = true;

// environment variables
const AEMET_API_KEY = process.env.AEMET_API_KEY;
const DB_URL_API = process.env.DB_URL_API;

const DB_ENPOINT = '/municipalities/';

// *** AEMET METHOD ***
exports.getFromAEMET = async () => {
  try {
    // all municipality
    const URL = `http://opendata.aemet.es/opendata/api/maestro/municipios/?api_key=${AEMET_API_KEY}`;

    const res =  await request
                        .get(URL)
                        .set('accept', 'text/plain')
                        .charset('ISO-8859-15');
    const municiplaties = JSON.parse(res.text);

    return municiplaties;

  } catch (err) {
    console.error(err);
  }
}


// *** DB METHOD ***
exports.getFromDB = async () => {
  try {
    const URL = DB_URL_API + DB_ENPOINT;
    
    const res = await request.get(URL);
    const municiplaties = JSON.parse(res.text);

    return municiplaties;

  } catch (err) {
    console.error(err);
  }
}

exports.countFromDB = async () => {
  try {
    const URL = DB_URL_API + DB_ENPOINT + '/count';

    const res = await request.get(URL);
    const count = JSON.parse(res.text);
    
    return count;

  } catch (err) {
    console.error(err);
  }  
}

exports.createOnDB = async (mun) => {
  try {
    const URL = DB_URL_API + DB_ENPOINT;

    const munData = {
      code: mun.id.substr(2),
      name: mun.nombre,
      capital: mun.capital
    };

    const res = await request
                        .post(URL)
                        .set('Content-Type', 'application/json')
                        .send(munData);

  } catch (err) {
    console.error(err);
  }
}

exports.deleteAllFromDB = async () => {
  try {
    const URL = DB_URL_API + DB_ENPOINT;

    await request.delete(URL);

  } catch (err) {
    console.error(err);
  } 
}