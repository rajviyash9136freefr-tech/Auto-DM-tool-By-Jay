const app = require('./src/app');

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 InAutoDM API running on port ${PORT}`);
  console.log(`📡 Health check: http://localhost:${PORT}/`);
});
