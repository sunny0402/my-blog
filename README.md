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
nodemon and concurrently
"server": "nodemon ../index.js",
"client": "react-scripts start",
"dev": "concurrently \"yarn run server\" \"yarn run client\""

## Config Vars

NPM_CONFIG_PRODUCTION=false
NODE_MODULES_CACHE=false
USE_NPM_INSTALL=true

## Debug Deployment

https://stackoverflow.com/questions/17180495/heroku-code-h10-desc-app-crashed-cant-figure-out-why-its-crashing
heroku restart

## Port Already in Use

https://dev.to/mattheindel/fixing-nodemon-error-listen-eaddrinuse-address-in-use-3ic2

Emitted 'error' event on Server instance at:
at emitErrorNT (node:net:1361:8)
at processTicksAndRejections (node:internal/process/task_queues:83:21) {
code: 'EADDRINUSE',
errno: -48,
syscall: 'listen',
address: '::',
port: 5000
}

kill -9 $(lsof -t -i:5000)

## Failed to load resource: the server responded with a status of 500 (Internal Server Error)

https://stackoverflow.com/questions/70317568/deploy-node-js-express-backend-to-heroku

## Error Code: 1142. SELECT command denied to user ..credentials.. for table 'articles'

https://devcenter.heroku.com/articles/jawsdb#connection-strategies

heroku config:get JAWSDB_URL
mysql://username:password@hostname:port/default_schema

## ClearDB

Create table.
CREATE TABLE IF NOT EXISTS `customers` (
id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
email varchar(255) NOT NULL,
name varchar(255) NOT NULL,
active BOOLEAN DEFAULT false
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

## Sql Error

code: 'ER_INVALID_DEFAULT',
errno: 1067,
sqlState: '42000',
sqlMessage: "Invalid default value for 'publishDate'",
sql: "CREATE TABLE IF NOT EXISTS `Articles` (`id` INTEGER auto_increment , `title` VARCHAR(255) NOT NULL, `author` VARCHAR(255) NOT NULL DEFAULT 'Alex', `readTime` INTEGER NOT NULL DEFAULT 10, `publishDate` DATE NOT NULL DEFAULT '3/16/2022', `isPublished` TINYINT(1) NOT NULL DEFAULT false, `content` TEXT NOT NULL, `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL, `deletedAt` DATETIME, PRIMARY KEY (`id`)) ENGINE=InnoDB;",
parameters: undefined
},
https://stackoverflow.com/questions/36374335/error-in-mysql-when-setting-default-value-for-date-or-datetime
SET sql_mode = '';
