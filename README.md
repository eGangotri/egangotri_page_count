# EGangotriPageCounter

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.0.2.

View Execution at:
https://egangotri.herokuapp.com/

locally
with npm run serve
http://localhost:8080/

with npm run ng_start
http://localhost:4200/


## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.


## Build

ng build --prod

## Deploy to Heroku
Dashboard:
https://dashboard.heroku.com/apps/egangotri/deploy/github
Currently set to Auto-Deply. Can be changed to Manual Deploy

https://itnext.io/how-to-deploy-angular-application-to-heroku-1d56e09c5147
https://medium.com/better-programming/how-to-deploy-your-angular-9-app-to-heroku-in-minutes-51d171c2f0d

For Logs:
https://dashboard.heroku.com/apps/egangotri/logs

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Docker
docker run -d -p 80:80  egangotri/egangotri-page-counter:latest 
http://ip_address:80/