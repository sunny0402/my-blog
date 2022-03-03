## Notes

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
