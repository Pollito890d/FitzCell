const app = require('./backend/index.js');
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`FitzCell Server running locally at http://localhost:${port}`);
});
