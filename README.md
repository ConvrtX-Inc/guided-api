# GUIDED Backend

## Description

GuidED will be a mobile platform that connects travelers with the outdoor adventures they are seeking.
GuidED will provide this service by directly contracting with local tour guides, similar to Airbnb. Through
the app, self-employed tour guides will be able to promote their services and share their expertise on a
wide range of outdoor recreation activities, such as hiking, scuba diving, or bird watching. Users will simply
need to download the app and indicate whether they are a guide or tour seeker. GuidED will then allow
outdoor enthusiasts to browse by geolocation, date, and type of activity. Alternatively, they may browse
individual profiles to compare guides based on experience, see their previous ratings, and view current
availability. Users will also be able to follow their guide’s updates through the app, in order to stay up to
date with their current outings and excursions. The company will also participate in ecological
conservation e-orts by providing outdoor enthusiasts with conservation management resources, o-ering
educational tours, and taking part in the 1% for the Planet organization. With this novel approach, GuidED
will quickly become an indispensable tool for outdoor enthusiasts and tour guides.


## Links - note this links are available after you run the project

- API Documentation: http://localhost:3000/docs
- API : http://localhost:3000/api/v1


## Quick start
1. Make sure that you have <a href="https://nodejs.org/en/" rel="nofollow">Node.js</a>, <a href="https://classic.yarnpkg.com/lang/en/docs/install" rel="nofollow">yarn</a>, npm and <a href="https://www.postgresql.org/download/" rel="nofollow">PostgreSQL</a> installed.

3. Go to the project folder and open your CLI

3. Copy and paste this code
```bash
cp env-example .env
```
4. Create new database on postgresql

5. Change `DATABASE_HOST=localhost` 

6. Change `DATABASE_USERNAME` to your database user name 

7. Change `DATABASE_PASSWORD`  to your database password 

8. Change `DATABASE_NAME`  to your newly created database

9. Change PWD="C:\Convrtx\Projects\GuidED\Web\Backend" to PWD="[yourlocalpath]"

10. Run this commands: {note if this is your first setup please remove existing migration files you can find it on "GuidED\Web\Backend\src\database\migrations" . }

```bash
yarn install

npm run migration:generate

npm run migration:run

npm run seed:run

npm run start:dev
```

## Note
if you encountered `yarn install` error please check the node version on package.json file look for
`"engines": {
    "node": "16.x"
}`
change the version 

## Database utils

Generate migration

```bash
npm run migration:generate -- CreateNameTable
```

Run migration

```bash
npm run migration:run
```

Revert migration

```bash
npm run migration:revert
```

Drop all tables in database

```bash
npm run schema:drop
```

Run seed

```bash
npm run seed:run
```

## Test

```bash
# unit tests
npm run test

# e2e tests
npm run test:e2e
```
