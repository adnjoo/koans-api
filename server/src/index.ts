import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import path from "path";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.get("/", (req: Request, res: Response) => {
  res.sendFile(path.resolve(__dirname, "../../scraper/zen_koans.json"));
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
