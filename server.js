const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
const mongoURI = process.env.MONGODB_URI;
mongoose.connect(mongoURI)
  .then(() => {
    console.log('Connected to MongoDB!');
    app.listen(process.env.PORT, () => {
      console.log(`Server started on port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });
app.get('/api/get-products', async (req, res) => {
  try {
    const db = mongoose.connection.db;
    const productsData = await db.collection("produits").find({}).toArray();
    res.json(productsData);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).send('Server Error');
  }
});

const chatlogSchema = new mongoose.Schema({
  idClient: { type: Number, required: true },
  nomPrenon: { type: String, required: true },
  email: { type: String, required: true },
  telephone: { type: String, required: true },
  message: { type: [String], required: true },
});
const Chatlog = mongoose.model('chatlog', chatlogSchema);
app.post('/api/submit-chatlog', async (req, res) => {
  const { nom, email, tel, message_user } = req.body;
  try {
    const existingClient = await Chatlog.findOne({ email: email, telephone: tel });
    if (existingClient) {
      existingClient.message.push(message_user);
      await existingClient.save();
      return res.status(200).json({ message: 'Message added to existing client.' });
    } else {
      const lastClient = await Chatlog.findOne().sort({ idClient: -1 });
      const newId = lastClient ? lastClient.idClient + 1 : 1;
      const newClient = new Chatlog({
        idClient: newId,
        nomPrenon: nom,
        email: email,
        telephone: tel,
        message: [message_user],
      });
      await newClient.save();
      return res.status(201).json({ message: 'New client created and message added.' });
    }
  } catch (error) {
    console.error('Error in submit-chatlog:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

app.post("/api/commandes", async (req, res) => {
  try {
    const { nomPrenom, pays, gouvernorat, email, telephone, comments, cartItems } = req.body;
    const order = { nomPrenom, pays, gouvernorat, email, telephone, comments, cartItems };
    const db = mongoose.connection.db;
    const result = await db.collection("commandes").insertOne(order);
    res.status(201).json({ message: "Order saved successfully!", orderId: result.insertedId });
  } catch (error) {
    console.error("Error saving order:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});