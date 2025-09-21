import express from 'express'
import cors from 'cors'
import 'dotenv/config' 
import { connectDB } from './config/db.js'


const app = express();
const PORT = process.env.PORT || 3000;

//middleware
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));


//db connect 
connectDB();

//routes
app.get('/', (req, res) => {
    res.send('API is running....');
});

app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});

