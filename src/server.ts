import express from 'express';

const app = express();

app.get("/pages", (request, response) => {
  return response.json({ message: "Hello World!" });
});

app.post("/pages", (request, response) => {
  return response.json({ message: "Os dados foram salvos com sucesso!" });
});

app.listen(3333, () => console.log("🚀 Server is running!"));