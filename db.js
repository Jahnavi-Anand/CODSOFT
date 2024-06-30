const { MongoClient } = require('mongodb');

// Connection URI and Database Name
const uri = 'mongodb+srv://devops:devops@cluster0.5298ya3.mongodb.net/quizzler?retryWrites=true&w=majority&appName=Cluster0'; 
const dbName = 'quizzler'; 

// Create a MongoDB client and connect to the server
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function connectToDatabase() {
    try {
        await client.connect();
        console.log('Connected to MongoDB');

        return client.db(dbName);
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        throw error;
    }
}

module.exports = { connectToDatabase };
