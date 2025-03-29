"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const patients_1 = __importDefault(require("../data/patients"));
const toPatientFormat_1 = __importDefault(require("../utils/toPatientFormat"));
const getPatients = () => {
    return patients_1.default.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
};
const addPatient = (newPatient) => {
    const newPatientParsed = (0, toPatientFormat_1.default)(newPatient);
    patients_1.default.concat(newPatientParsed);
    return getPatients();
};
exports.default = { getPatients: getPatients, addPatient };
