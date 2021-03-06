const controllers = require('./controllers');
const router = (app) => {
  app.get('/page1', controllers.page1);
  app.get('/page2', controllers.page2);
  app.get('/page3', controllers.page3);
  app.get('/page4', controllers.page4);
  app.get('/getCat', controllers.getCat);
  app.get('/getDog', controllers.getDog);
  app.get('/dogByName', controllers.searchDog);
  app.get('/catByName', controllers.searchCat);
  app.get('/', controllers.index);
  app.get('/*', controllers.notFound);
  app.post('/catName', controllers.catName);
  app.post('/dogName', controllers.dogName);
  app.post('/updateLast', controllers.updateCat);
};
module.exports = router;