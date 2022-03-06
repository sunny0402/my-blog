## About

Blog website with React, Express and MySQL.

## Development Notes

## Deploy with Heroku

```
brew tap heroku/brew && brew install heroku

heroku login

git status

create app on heroku website

connect heroku app to github repo and enable automatic deploys

touch Procfile
web: node backend/index.js

```

heroku config:set NPM_CONFIG_PRODUCTION=false --app sunnycodes

heroku run bash -a $APP_NAME

## MySQL

Installation:

brew install mysql

MySQL is configured to only allow connections from localhost by default

To connect run: mysql -uroot To restart mysql after an upgrade: brew services restart mysql

brew install --cask mysqlworkbench

hint: c # merge (the default strategy)
hint: git config pull.rebase true # rebase
hint: git config pull.ff only # fast-forward only

## npm concurrently

https://medium.com/swlh/building-a-react-app-with-a-express-back-end-in-the-same-project-with-external-access-to-a-mysql-e06ef83c257d
For dev enviroment try the following set up:
"server": "nodemon -r dotenv/config ./src/server/server.js",
"client": "react-scripts start",
"dev": "concurrently \"yarn run server\" \"yarn run client\""
