import express from 'express'
import cors from 'cors'
import 'dotenv/config' 
import { connectDB } from './config/db.js'
import userRouter from './routes/userRoute.js'
import taskRouter from './routes/taskRouter.js'
import * as path from 'path'



const app = express();
const PORT = process.env.PORT || 3000;

//middleware
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));


//db connect 
connectDB();

//routes

app.use('/api/user', userRouter);
app.use('/api/tasks', taskRouter);



const __dirname1 = path.resolve();
if(process.env.NODE_ENV === 'deployment'){
    app.use(express.static(path.join(__dirname1, 'client', 'dist')));
    app.get(/.*/, (req, res) => {
        res.sendFile(path.resolve(__dirname1, 'client', 'dist', 'index.html'));
    });
}
else{
app.get('/', (req, res) => {
    res.send('API is running....');
});
}

app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});



