require("dotenv").config();
const {mongoose} = require('mongoose');

const fixIndex = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to DB');
    
    // Drop the old index
    await mongoose.connection.db.collection('users').dropIndex('firebaseUid_1');
    console.log('Index dropped successfully');
    
    await mongoose.disconnect();
    console.log('Disconnected from DB');
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
};

fixIndex();