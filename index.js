const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.USER_NAME}:${process.env.PASSWORD}@cluster0.3w4hwcs.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();

    const toyCollection = client.db('carToys').collection('toy');

    app.get('/toys', async (req, res) => {
      let query = {};
      if (req.query.email) {
        query = { email: req.query.email };
      }

      const result = await toyCollection.find(query).toArray();
      res.send(result);
      console.log(result);
    });

    app.post('/toy', async (req, res) => {
      const toy = req.body;
      const result = await toyCollection.insertOne(toy);
      res.send(result);
    });

    // app.get('/toy', async (req, res) => {
    //   const toy = req.body;
    //   const result = await toyCollection.insertOne(toy);
    //   res.send(result);
    // });
    // app.get('/toy/:id', async (req, res) =>{
    //   const id=req.params.id;

    // })

    // Send a ping to confirm a successful connection
    // await client.db('admin').command({ ping: 1 });
    console.log(
      'Pinged your deployment. You successfully connected to MongoDB!'
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get('/', (req, res) => {
  res.send('Car toy is running');
});

app.listen(port, () => {
  console.log('Car toy is running');
});
