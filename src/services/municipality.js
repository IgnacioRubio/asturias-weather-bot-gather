const request = require('superagent');
require('superagent-charset')(request);

const getAllMunicipalities = async (apiKey) => {
  try {
    // all municipality
    const URL = `http://opendata.aemet.es/opendata/api/maestro/municipios/?api_key=${apiKey}`;

    const res =  await request.get(URL).set('accept', 'text/plain').charset('ISO-8859-15');

    const municiplaties = JSON.parse(res.text);

    return municiplaties;

  } catch (err) {
    console.error(err);
  }
};

// EXPORTS
module.exports = {
  getAllMunicipalities: getAllMunicipalities
};