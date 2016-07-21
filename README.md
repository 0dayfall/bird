# bird

Clone from git and use:

cd birds && npm install

start the app: node app.js

in another terminal run the tests with mocha: mocha

  bird tests
    - post bird (without parameters: added, visible)

this test posts are bird with only the mandatory parameters

    - post one more bird

this test posts a bird with all parameters

    - and one more with duplicate continents

this test posts a bird with duplicate continents

    - get all birds, not the invisible ones..

this tests gets all the birds except the invisible ones

    - get a specific bird

get the first bird posted

    - delete a specific invisible bird

delete that one

    - try to get deleted one (404)

try to get the specific bird that was just deleted

    - get all birds, should still be 1

get all birds, it should be 1

Important parts of the code is in routes.js:

- router.get('/birds', birds.findAll);
- router.get('/birds/:id', birds.findOne);
- router.post('/birds', birds.addOne);
- router.delete('/birds/:id', birds.deleteOne);

this code routes requests to birds.js - birds.js connects with the database. It could also be that only parameters were checked for logic and an additional bird provider would access database, but now it's in the same place.