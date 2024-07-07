import express, { urlencoded } from 'express'
import doteenv from 'dotenv'
import conectDb from './config/db.js'
import cookieParser from 'cookie-parser'
import morgan from 'morgan'
import router from './routes/route.js'

const app = express();
  

app.use(morgan("dev"));

doteenv.config()

conectDb(); 

const port = process.env.PORT || 5000

app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.use(cookieParser())  

app.use('/api',router)

app.get('/', (req, res)=> res.send('Server is redy'));


app.listen(port, ()=> console.log(`Server is running on port ${port}`));
