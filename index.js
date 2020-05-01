require('dotenv').config();

const API_KEY = process.env.AEMET_API_KEY;

const Municipality = require('./src/services/municipality');
const Forecasting = require('./src/services/forecasting');

(async () => {
  try {
    const municiplities = await Municipality.getAllMunicipalities(API_KEY);
    
    for await (mun of municiplities) {
      if (mun.nombre === "Avilés") {
        const id = mun.id.substr(2);
        const forecast = await Forecasting.getForecastingDailyMunicipality(id, API_KEY);

        console.log('*****AVILES*****')
        console.log(JSON.stringify(forecast));
      }
      if (mun.nombre === "Gijón") {
        const id = mun.id.substr(2);
        const forecast = await Forecasting.getForecastingDailyMunicipality(id, API_KEY);

        console.log('*****GIJON*****')
        console.log(JSON.stringify(forecast));
      }
      if (mun.nombre === "Oviedo") {
        const id = mun.id.substr(2);
        const forecast = await Forecasting.getForecastingDailyMunicipality(id, API_KEY);

        console.log('*****OVIEDO*****')
        console.log(JSON.stringify(forecast));
      }
    }
  } catch (err) {
    console.error(err);
  }
})();