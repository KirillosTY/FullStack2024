"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("dotenv/config");
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const corsOptions = {
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
};
app.use((0, cors_1.default)(corsOptions));
const routerPatients_1 = __importDefault(require("./routes/routerPatients"));
const routerDiagnoses_1 = __importDefault(require("./routes/routerDiagnoses"));
app.get('/api/ping', (_req, res) => {
    res.send("PONG");
});
app.use('/api/patients', routerPatients_1.default);
app.use('/api/diagnoses', routerDiagnoses_1.default);
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
