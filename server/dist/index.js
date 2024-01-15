"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
const port = process.env.PORT || 3000;
app.get("/", (req, res) => {
    res.sendFile(path_1.default.resolve(__dirname, "zen_koans.json"));
});
app.get("/koan/:id", (req, res) => {
    const koans = require(path_1.default.resolve(__dirname, "zen_koans.json"));
    const id = Number(req.params.id);
    const koan = koans.find((koan) => Number(koan.id) === id);
    // console.log(koan);
    if (koan) {
        res.send(koan);
    }
    else {
        res.status(404).send("Koan not found");
    }
});
app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
