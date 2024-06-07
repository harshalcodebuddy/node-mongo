const mongoose = require('mongoose');
const mongoUri = process.env.MONGO_URI || 'mongodb://appUser:appPassword@localhost:27017/myDatabase' 
mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('MongoDB connected');
}).catch(err => {
  console.error('MongoDB connection error:', err);
});
