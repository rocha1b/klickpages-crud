import express, { Request, Response } from 'express';
import routes from "./routes";

const app = express();
app.use(express.json());
app.use(routes);

app.get("/pages", (request: Request, response: Response) => {
  return response.json({ message: "Hello World!" });
});

app.post("/pages", (request: Request, response: Response) => {
  return response.json({ message: "Os dados foram salvos com sucesso!" });
});

app.listen(3333, () => console.log("🚀 Server is running on port 3333!"));