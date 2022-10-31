import  express  from "express";
import  authRoutes  from "./routes/auth.routes";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();
app.use(cookieParser())
app.use(cors({    
    origin:'http://localhost:5173',
    credentials: true,
}));
app.use(express.json());

app.use('/api/auth', authRoutes);

export default app;