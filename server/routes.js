// server/routes.js
import characters from './controllers/characters';


module.exports = function(app) {
  app.post('/api/report', characters.report);
  app.get('/api/stats', characters.getStatus);
  app.get('/api/characters', characters.getTwoRandom);
  app.post('/api/characters', characters.add);
  app.put('/api/characters', characters.update);
  app.get('/api/characters/top', characters.getTopContent);
  app.get('/api/characters/search', characters.search);
  app.get('/api/characters/shame', characters.getShameContent);
  app.get('/api/characters/count', characters.count);
  // have to put /:id routes at the bottom to not let it override the other /top /search, etc.
  app.get('/api/characters/:id', characters.getOne);
}