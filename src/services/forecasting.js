const request = require('superagent');
require('superagent-charset')(request);

const mine = ['text/plain', 'ISO-8859-15'];
request.buffer[mine] = true;

// environment variables
const AEMET_API_KEY = process.env.AEMET_API_KEY;
const DB_URL_API = process.env.DB_URL_API;

const DB_ENPOINT = '/forecastings/';

// *** AEMET METHOD ***
exports.getDailyByMunicipalityFromAEMET = async function(municipalityId) {
  try {
    const URL = `http://opendata.aemet.es/opendata/api/prediccion/especifica/municipio/diaria/${municipalityId}/?api_key=${AEMET_API_KEY}`;

    // url where to get data
    const res = await request.get(URL);
  
    // get forecastings data
    const forecastings = await request.get(JSON.parse(res.text).datos).charset('ISO-8859-15')
  
    return JSON.parse(forecastings.text);

  } catch (err) {
    console.error(err);
  }
}


// *** DB METHOD ***
exports.getFromDB = async () => {
  try {
    const URL = DB_URL_API + DB_ENPOINT;

    const res = await request.get(URL);
    const forecastings = JSON.parse(res.text);

    return forecastings;

  } catch (err) {
    console.error(err);
  }
}

exports.createOnDB = async (mun, fcast) => {
  try {
    const URL = DB_URL_API + DB_ENPOINT;

    const fcastData = {
      municipalityName: mun.name,
      municipalityCode: mun.code,
      precipitations: fcast.probPrecipitacion,
      temperatures: fcast.temperatura.dato,
      stateSkies: fcast.estadoCielo,
      winds: fcast.viento,
      humidities: fcast.humedadRelativa.dato
    };

    const res = await request
                        .post(URL)
                        .set('Content-Type', 'application/json')
                        .send(fcastData);

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