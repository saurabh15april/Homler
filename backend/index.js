const express = require('express');     // require express for routing 
const app = express();                  // excuateable express instance
const mongoose = require('mongoose');    // require mongoose instance
const PORT = 8080;
const { MongoClient } = require('mongodb');         // connect to and interact with a MongoDB database
const cors = require('cors');                       // to handle error 
// add mideielware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true})); 

const url = 'mongodb://localhost:27017'; // Use your local MongoDB URL or Atlas connection string
const dbName = 'Maintenance'; // Replace with your database name

// Create a new MongoClient
const client = new MongoClient(url);

// Connect to MongoDB
async function connectToMongo() {
    try {
        await client.connect();
        console.log('Connected successfully to MongoDB');
    } catch (err) {
        console.error('Failed to connect to MongoDB', err);
    }
}

// Call the function to connect
connectToMongo();
// Sign Up function to log in any one 
app.post('/Signup', async(req,res)=>{
    console.log(req.body);
    const db= client.db(dbName);
   const collection = db.collection('User');
   collection.insertOne(req.body);
   res.send({massage: "success"}); 
    
 })

// Add the details of the Maintenance Record
 app.post('/Addproduct', async (req,res)=>{
    console.log(req.body);
    const db= client.db(dbName);
    const collection = db.collection('MaintenanceRecord');
    collection.insertMany(req.body);
    // collection.deleteMany();
    res.send({massage: "successfully added"});
 })

 // To access every data of data base: 

 app.get('/*', async (req,res)=>{
    const db = client.db(dbName);
    const collection = db.collection('MaintenanceRecord');
    const result = await collection.find({}).toArray((err, docs)=>{
        if(err){
            console.log(err);
        }
        else{
            res.send(docs);
        }
    })
    res.send(result);
})

// update Data of maintinance.
app.put('/update/:id', async (req, res) => {
    try {
        const db = client.db(dbName);
        const collection = db.collection('MaintenanceRecord'); // Replace with your collection name

        const id = req.params.id; // Document identifier (assume it's a unique field, like _id)
        const updateData = req.body; // Data to update, sent in request body

        // Filter by ID and perform update
        const filter = { performedBy :id }; // Use ObjectId if _id is in ObjectId format
        const update = { $set: updateData }; // Set the new fields or values

        const result = await collection.updateOne(filter, update);

        if (result.matchedCount === 0) {
            return res.status(404).json({ message: 'Document not found' });
        }

        res.json({
            message: 'Document updated successfully',
            matchedCount: result.matchedCount,
            modifiedCount: result.modifiedCount,
        });
    } catch (error) {
        console.error('Error updating document:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Search the data for document matching 
app.get('/search/:id', async (req, res) => {
    try {
        const db = client.db(dbName);
        const collection = db.collection('MaintenanceRecord'); // Replace with your collection name
        const id = req.params.id;

        // Assume `date` is stored as a string in MongoDB
        // const check1 = { date: id }; 

        // Query the database
        const results = await collection.find({ date: id }).toArray();

        if (results.length === 0) {
            return res.status(404).json({ message: 'No matching documents found' });
        }

        res.json({
            message: 'Search successful',
            resultsCount: results.length,
            data: results,
        });
    } catch (error) {
        console.error('Error during search:', error);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
});

// delete the data from the database
app.delete('/delete/:id', async (req, res) => {
    try {
        const db = client.db(dbName);
        const collection = db.collection('MaintenanceRecord'); // Replace with your collection name
        const id = req.params.id;

        // Assume `date` is stored as a string in MongoDB
        const check2 = { performedBy: id };

        // Query the database
        const results = await collection.deleteOne(check2);

        if (results.length === 0) {
            return res.status(404).json({ message: 'No matching documents found' });
        }

        res.json({
            message: 'Search successful',
            resultsCount: results.length,
            data: results,
        });
    } catch (error) {
        console.error('Error during search:', error);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
}); 





app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
