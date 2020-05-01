const request = require('superagent');
require('superagent-charset')(request);

const getForecastingDailyMunicipality = async function(municipalityId, apiKey) {
  try {
    const URL = `http://opendata.aemet.es/opendata/api/prediccion/especifica/municipio/diaria/${municipalityId}/?api_key=${apiKey}`;

    const res = await request.get(URL);
  
    const ress = await request.get(JSON.parse(res.text).datos).charset('ISO-8859-15')
  
    return JSON.parse(ress.text);
  } catch (err) {
    console.error(err);
  }
}


// EXPORTS
module.exports = {
  getForecastingDailyMunicipality: getForecastingDailyMunicipality
}