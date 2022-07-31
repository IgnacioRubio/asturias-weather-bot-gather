require('dotenv').config();
require('./src/util/env');

const schedule = require('node-schedule');

const Municipality = require('./src/services/municipality');
const Forecasting = require('./src/services/forecasting');
// const Email = require('./src/services/email');


// municipalities to insert
const MUN_NAMES = ['Avilés', 'Gijón', 'Oviedo', 'Siero', 'Langreo'];


// FORCE FUNCTION WHEN NEEDED, npm run force
if (process.env.FORCE_RUN) {
  gather();

  return;
}


schedule.scheduleJob('0 0 6 * * *', async () => {
  gather();
});


async function gather() {
  try {
    console.log(new Date().toString());
    console.log('Running Asturias Weather Gather');
    
    // check number of municipalities from db's match expected
    let municipalitiesDB =  await Municipality.getFromDB();

    if (MUN_NAMES.length != municipalitiesDB.length) {
      console.log('INSERTING MUNICIPALITIES INTO DB...');

      // municipalities from AEMET
      const municipalitiesAEMET = await Municipality.getFromAEMET();

      // delete all records from db
      await Municipality.deleteAllFromDB();

      for await (let mun of municipalitiesAEMET) {
        // create only from MUN_NAMES
        if (MUN_NAMES.indexOf(mun.nombre) > -1) {
          console.log('Inserting mun: ' + mun.nombre);

          await Municipality.createOnDB(mun);
        }
      }

      municipalitiesDB =  await Municipality.getFromDB();
      console.log('INSERTING MUNICIPALITIES COMPLETED!');
    }

    // delete all forecasting already stored
    await Forecasting.deleteAllFromDB();

    console.log('INSERTING FORECASTINGS INTO DB...');
    // create new forecastings
    for await (let munDB of municipalitiesDB) {
      console.log('Inserting mun: ' + munDB.name);
      
      // forecasting from AEMET
      const forecast = await Forecasting.getDailyByMunicipalityFromAEMET(munDB.code);

      // store new forecasting
      await Forecasting.createOnDB(munDB, forecast[0].prediccion.dia[1]);
    }
    console.log('INSERTING FORECASTINGS COMPLETED!');

  } catch (err) {
    // notify error with email
    msg = {
      subject: 'ERROR WAS THROW IN ASTURIAS-WEATHER-BOT-GATHER',
      text: err.toString()
    };

    // Email.send(msg);

    // log error
    console.error(err);
  }
}