// const express = require('express');     // require express for routing 
// const app = express();                  // excuateable express instance
// const mongoose = require('mongoose');    // require mongoose instance
// require('dotenv').config();
// const PORT = process.env.PORT || 8080;
// const { MongoClient } = require('mongodb');         // connect to and interact with a MongoDB database
// const cors = require('cors');                       // to handle error 
// // add mideielware
// app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({extended: true})); 

// const url = 'mongodb://localhost:27017'; // Use your local MongoDB URL or Atlas connection string
// const dbName = 'Maintenance'; // Replace with your database name

// // Create a new MongoClient
// const client = new MongoClient(url);

// // Connect to MongoDB
// async function connectToMongo() {
//     try {
//         await client.connect();
//         console.log('Connected successfully to MongoDB');
//     } catch (err) {
//         console.error('Failed to connect to MongoDB', err);
//     }
// }

// // Call the function to connect
// connectToMongo();
// // Sign Up function to log in any one 
// app.post('/Signup', async(req,res)=>{
//     console.log(req.body);
//     const db= client.db(dbName);
//    const collection = db.collection('User');
//    collection.insertOne(req.body);
//    res.send({massage: "success"}); 
    
//  })

// // Add the details of the Maintenance Record
//  app.post('/Addproduct', async (req,res)=>{
//     console.log(req.body);
//     const db= client.db(dbName);
//     const collection = db.collection('MaintenanceRecord');
//     collection.insertOne(req.body);
//     // collection.deleteMany();
//     res.send({massage: "successfully added"});
//  })

//  // To access every data of data base: 

//  app.get('/*', async (req,res)=>{
//     const db = client.db(dbName);
//     const collection = db.collection('MaintenanceRecord');
//     const result = await collection.find({}).toArray((err, docs)=>{
//         if(err){
//             console.log(err);
//         }
//         else{
//             res.send(docs);
//         }
//     })
//     res.send(result);
// })

// // update Data of maintinance.
// app.put('/update/:id', async (req, res) => {
//     try {
//         const db = client.db(dbName);
//         const collection = db.collection('MaintenanceRecord'); // Replace with your collection name

//         const id = req.params.id; // Document identifier (assume it's a unique field, like _id)
//         const updateData = req.body; // Data to update, sent in request body

//         // Filter by ID and perform update
//         const filter = { performedBy :id }; // Use ObjectId if _id is in ObjectId format
//         const update = { $set: updateData }; // Set the new fields or values

//         const result = await collection.updateOne(filter, update);

//         if (result.matchedCount === 0) {
//             return res.status(404).json({ message: 'Document not found' });
//         }

//         res.json({
//             message: 'Document updated successfully',
//             matchedCount: result.matchedCount,
//             modifiedCount: result.modifiedCount,
//         });
//     } catch (error) {
//         console.error('Error updating document:', error);
//         res.status(500).json({ message: 'Internal Server Error' });
//     }
// });

// // Search the data for document matching 
// app.get('/search/:id', async (req, res) => {
//     try {
//         const db = client.db(dbName);
//         const collection = db.collection('MaintenanceRecord'); // Replace with your collection name
//         const id = req.params.id;

//         // Assume `date` is stored as a string in MongoDB
//         // const check1 = { date: id }; 

//         // Query the database
//         const results = await collection.find({ date: id }).toArray();

//         if (results.length === 0) {
//             return res.status(404).json({ message: 'No matching documents found' });
//         }

//         res.json({
//             message: 'Search successful',
//             resultsCount: results.length,
//             data: results,
//         });
//     } catch (error) {
//         console.error('Error during search:', error);
//         res.status(500).json({ message: 'Internal Server Error', error: error.message });
//     }
// });

// // delete the data from the database
// app.delete('/delete/:id', async (req, res) => {
//     try {
//         const db = client.db(dbName);
//         const collection = db.collection('MaintenanceRecord'); // Replace with your collection name
//         const id = req.params.id;

//         // Assume `date` is stored as a string in MongoDB
//         const check2 = { 
//             recordId: id };

//         // Query the database
//         const results = await collection.deleteOne(check2);

//         if (results.length === 0) {
//             return res.status(404).json({ message: 'No matching documents found' });
//         }

//         res.json({
//             message: 'Search successful',
//             resultsCount: results.length,
//             data: results,
//         });
//     } catch (error) {
//         console.error('Error during search:', error);
//         res.status(500).json({ message: 'Internal Server Error', error: error.message });
//     }
// }); 





// app.listen(PORT, () => {
//     console.log(`Server is running on http://localhost:${PORT}`);
// });




const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();
const { MongoClient, ObjectId } = require('mongodb');
const cors = require('cors');

const PORT = process.env.PORT || 8080;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/Maintenance';

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB Connection
const client = new MongoClient(MONGO_URI);
const dbName = 'Maintenance';
let db;

async function connectToMongo() {
    try {
        await client.connect();
        db = client.db(dbName);
        console.log('Connected successfully to MongoDB');
    } catch (err) {
        console.error('Failed to connect to MongoDB', err);
    }
}
connectToMongo();

// Sign Up Function
app.post('/Signup', async (req, res) => {
    try {
        const collection = db.collection('User');
        await collection.insertOne(req.body);
        res.send({ message: 'Signup successful' });
    } catch (err) {
        res.status(500).send({ error: 'Failed to signup', details: err.message });
    }
});

// Add Maintenance Record
app.post('/Addproduct', async (req, res) => {
    try {
        const collection = db.collection('MaintenanceRecord');
        await collection.insertOne(req.body);
        res.send({ message: 'Maintenance record added successfully' });
    } catch (err) {
        res.status(500).send({ error: 'Failed to add record', details: err.message });
    }
});

// Get All Records
app.get('/*', async (req, res) => {
    try {
        const collection = db.collection('MaintenanceRecord');
        const records = await collection.find().toArray();
        res.send(records);
    } catch (err) {
        res.status(500).send({ error: 'Failed to fetch records', details: err.message });
    }
});

// Update a Record
app.put('/update/:id', async (req, res) => {
    try {
        const collection = db.collection('MaintenanceRecord');
        const id = req.params.id;
        const updateData = req.body;

        const result = await collection.updateOne({ _id: new ObjectId(id) }, { $set: updateData });

        if (result.matchedCount === 0) {
            return res.status(404).send({ message: 'Record not found' });
        }
        res.send({ message: 'Record updated successfully' });
    } catch (err) {
        res.status(500).send({ error: 'Failed to update record', details: err.message });
    }
});

// Search for a Record by Date
app.get('/search/:date', async (req, res) => {
    try {
        const collection = db.collection('MaintenanceRecord');
        const date = req.params.date;
        const results = await collection.find({ date }).toArray();

        if (results.length === 0) {
            return res.status(404).send({ message: 'No matching documents found' });
        }
        res.send(results);
    } catch (err) {
        res.status(500).send({ error: 'Search failed', details: err.message });
    }
});

// Delete a Record
app.delete('/delete/:id', async (req, res) => {
    try {
        const collection = db.collection('MaintenanceRecord');
        const id = req.params.id;
        const result = await collection.deleteOne({ _id: new ObjectId(id) });

        if (result.deletedCount === 0) {
            return res.status(404).send({ message: 'No matching document found' });
        }
        res.send({ message: 'Record deleted successfully' });
    } catch (err) {
        res.status(500).send({ error: 'Failed to delete record', details: err.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
