import express, { Request, Response } from 'express';
import routes from "./routes";

const app = express();
app.use(express.json());
app.use(routes);

app.listen(4444, () => console.log("🚀 Server is running on port 4444!"));