import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import path from "path";
import cors from "cors";

dotenv.config();

const app: Express = express();
app.use(cors());
const port = process.env.PORT || 3000;

app.get("/", (req: Request, res: Response) => {
  res.sendFile(path.resolve(__dirname, "zen_koans.json"));
});

app.get("/koan/:id", (req: Request, res: Response) => {
  const koans = require(path.resolve(__dirname, "zen_koans.json"));
  const id = Number(req.params.id);
  const koan = koans.find((koan: any) => Number(koan.id) === id);
  // console.log(koan);

  if (koan) {
    res.send(koan);
  } else {
    res.status(404).send("Koan not found");
  }
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
