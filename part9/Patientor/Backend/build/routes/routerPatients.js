"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const patientService_1 = __importDefault(require("../services/patientService"));
const router = express_1.default.Router();
router.get('/');
router.get('/', (_req, res) => {
    console.log('We visited');
    res.send(patientService_1.default.getPatients());
});
router.post('/', (_req, res) => {
    console.log('We visited');

    const updatedPatients = patientService_1.default.addPatient(_req.body);
    res.send(updatedPatients);
});
exports.default = router;
