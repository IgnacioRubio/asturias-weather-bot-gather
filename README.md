# Asturias Weather Bot Gather

Service to gather information about Weather in Asturias.


## Information 🚀

### Architecture

![alt text](https://i.imgur.com/jxk19Yf.png)

- **AEMET API:** it's an API REST service for meteorology data from Spain
- **ASTURIAS-WEAHTER-BOT-GATHER:** microservice to request forecasting and municipality data
- **ASTURIAS-WEATHER-BOT-API:** microserive to manage CRUD operations
- **DATABASE:** storages data of forecastings and municipalities
- **ASTURIAS-WEATHER-BOT-SENDER:** microservice to create tweets about forecasting and munipality data

### Pre-requisitos 📋

Software requited to run this project:
- Git
- NodeJS v10.16.0
- NPM v6.14.5
- *Nodemon (optional)*
- *PM2 (optional)*


### Installation & First Run 🔧

1. Clone the repo and navigate to the workspace folder:

```bash
git clone https://github.com/IgnacioRubio/asturias-weather-bot-gather.git
cd asturias-weather-bot-gather
```

2. Install project dependencies

```bash
npm install
```

3. Create and set up environment variables into *.env* file 

```bash
echo > .env
```

```
AEMET_API_KEY=(get it from AEMET page)
DB_URL_API=3000
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=465
EMAIL_AUTH_USER=example@example.com
EMAIL_AUTH_PASS=example123
EMAIL_MSG_FROM=exmaple@example.com
EMAIL_MSG_TO=example@example.com
```

3. Run GATHER service 

```
npm start
```

### What's included 📂

```
asturias-weather-bot-gather
├── index.js
├── LICENSE
├── package.json
├── package-lock.json
├── README.md
└── src
    ├── services
    │   ├── email.js
    │   ├── forecasting.js
    │   └── municipality.js
    └── util
        └── env.js
```

### Flowchart

![alt text](https://i.imgur.com/Vg5UZwd.png)

## Deployment 📦

PM2 is used to make the deployment.

1. Run *package.json* script `npm run pm2`
2. List service `pm2 list`
3. Restart service after update `pm2 restart awb-gather`
4. Stop service `pm2 stop awb-gather`

## Built with 🛠️

* [NodeJS](https://nodejs.org/en/) - JavaScript runtime
* [Express](https://maven.apache.org/) - Web application framework
* [nodemailer](https://maven.apache.org/) - Easy as cake e-mail sending
* [node-schedule](https://maven.apache.org/) - A cron-like and not-cron-like job scheduler
* [dotenv](https://www.npmjs.com/package/dotenv) - Storing configuration in the environment 

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details