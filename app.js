import express from 'express'
import userRoutes from './routes/userRoute.js'
import profileRoute from './routes/profileRoute.js'
import logger from './middlewares/logger.js';
import bookRoutes from "./routes/bookRoute.js"
import cors from "cors"

const app = express();
app.use(cors())
app.use(express.json());
app.use(logger)

app.use(express.urlencoded({ extended: true }));
app.use('/api/users',userRoutes)
app.use('/api/profile', profileRoute)
app.use('/api/books',bookRoutes)


export default app;
