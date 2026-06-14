const express = require('express')
require('dotenv').config()
const app = express()
const cors = require('cors')
app.use(cors())
app.use(express.json())
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = process.env.MONGO_URI
const port = process.env.PORT


const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        const db = client.db('sportnest')
        const facilityCollection = db.collection('facilities')
        const bookingCollection = db.collection('bookings')


        // ************************************************Creating the booking post API***********************************************************
        app.post('/booking', async (req, res) => {
            const bookingData = req.body
            const result = await bookingCollection.insertOne(bookingData)
            res.send(result)
        })


        // ************************************************Creating the booking get API***********************************************************
        app.get('/booking/:userId', async (req, res) => {
            const userId = req.params.userId
            const query = { userId: userId }
            const result = await bookingCollection.find(query).toArray()
            res.send(result)
        })


        // ************************************************Creating the booking delete API***********************************************************
        app.delete('/booking/:bookingId', async (req, res) => {
            const id = req.params.bookingId
            const query = { _id: new ObjectId(id) }
            const result = await bookingCollection.deleteOne(query)
            res.send(result)
        })


        // ************************************************Creating the facility post API***********************************************************
        app.post('/facility', async (req, res) => {
            const facilityData = req.body
            const result = await facilityCollection.insertOne(facilityData)
            res.send(result)
        })


        // ************************************************Creating the facility get API***********************************************************
        app.get('/facility', async (req, res) => {
            const result = await facilityCollection.find().toArray()
            res.send(result)
        })


        // ************************************************Creating the facility get API by ID***********************************************************
        app.get('/facility/:id', async (req, res) => {
            const id = req.params.id
            const query = { _id: new ObjectId(id) }
            const result = await facilityCollection.findOne(query)
            res.send(result)
        })



        // ************************************************Creating the facility Patch API by ID***********************************************************
        app.patch('/facility/:id', async (req, res) => {
            const id = req.params.id
            const updateData = req.body
            const query = { _id: new ObjectId(id) }
            const result = await facilityCollection.updateOne(query, { $set: updateData })
            res.send(result)
        })


        // ************************************************Creating the facility Delete API by ID***********************************************************
        app.delete('/facility/:id', async (req, res) => {
            const id = req.params.id
            const query = { _id: new ObjectId(id) }
            const result = await facilityCollection.deleteOne(query)
            res.send(result)
        })


    
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        // Send a ping to confirm a successful connection
        // await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('Your server is working perfectly !')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})