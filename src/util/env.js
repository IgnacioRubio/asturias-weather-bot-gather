try {
  if (process.env.AEMET_API_KEY === undefined) throw new Error("Enviroment variable 'AEMET_API_KEY' not defined.");
  if (process.env.DB_URL_API === undefined) throw new Error("Enviroment variable 'DB_URL_API' not defined.");
  if (process.env.EMAIL_HOST === undefined) throw new Error("Enviroment variable 'EMAIL_HOST' not defined.");
  if (process.env.EMAIL_PORT === undefined) throw new Error("Enviroment variable 'EMAIL_PORT' not defined.");
  if (process.env.EMAIL_AUTH_USER === undefined) throw new Error("Enviroment variable 'EMAIL_AUTH_USER' not defined.");
  if (process.env.EMAIL_AUTH_PASS === undefined) throw new Error("Enviroment variable 'EMAIL_AUTH_PASS' not defined.");
  if (process.env.EMAIL_MSG_FROM === undefined) throw new Error("Enviroment variable 'EMAIL_MSG_FROM' not defined.");
  if (process.env.EMAIL_MSG_TO === undefined) throw new Error("Enviroment variable 'EMAIL_MSG_TO' not defined.");

} catch (err) {
  throw err;
}
