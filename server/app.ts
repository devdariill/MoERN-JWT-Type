import  express  from "express";
import  authRoutes  from "./routes/auth.routes";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);

export default app;