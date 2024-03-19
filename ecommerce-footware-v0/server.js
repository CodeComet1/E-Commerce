import express from 'express'
import colors from 'colors'
import dotenv from 'dotenv'
import morgan from 'morgan'
import connectDB from './config/db.js'


dotenv.config()

//database config
connectDB();

const app = express()

//middlewares

app.use(express.json());
app.use(morgan('dev'))


app.get('/',(req,res) => {
    res.send("<h1>Welcome to E-Commerce App Hello Sai</h1>")
})

//PORT
const PORT = process.env.PORT || 8080   ;

//RUN LISTEN

app.listen(PORT,() =>{
    console.log(`SERVER RUNNING ON ${PORT}`.bgCyan.white);
});
