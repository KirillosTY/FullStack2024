"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("../types");
const uuid_1 = require("uuid");
const toAddPatient = (object) => {
    if (!object || typeof object !== 'object') {
        throw new Error("Incorrect data");
    }
    if ('name' in object && 'dateOfBirth' in object
        && 'gender' in object && 'occupation' in object && 'ssn' in object) {
        const newPatient = {
            "id": (0, uuid_1.v1)(),
            name: parseName(object.name),
            dateOfBirth: parseBirth(object.dateOfBirth),
            ssn: parseSsn(object.ssn),
            gender: parseGender(object.gender),
            occupation: parseOccupation(object.occupation)
        };
        return newPatient;
    }
    else {
        throw new Error("Some fields are missings");
    }
};
exports.default = toAddPatient;
const parseSsn = (ssn) => {
    if (!ssn || !isString(ssn)) {
        throw new Error('name is missing');
    }
    return ssn;
};
const parseName = (name) => {
    if (!name || !isString(name)) {
        throw new Error('name is missing');
    }
    return name;
};
const parseBirth = (date) => {
    if (!date || !isString(date) || isDate((date))) {
        throw new Error('date is wrong');
    }
    return date;
};
const isDate = (date) => {
    if (Object.prototype.toString.call(date) === '[object Date]') {
        return true;
    }
    return false;
};
const parseOccupation = (occupation) => {
    if (!occupation || !isString(occupation)) {
        throw new Error('occupation is missing');
    }
    return occupation;
};
const parseGender = (gender) => {
    if (!gender || !isString(gender) || !isGender(gender)) {
        throw new Error('occupation is missing');
    }
    return gender;
};
const isString = (text) => {
    return typeof text === 'string' || text instanceof String;
};
const isGender = (gend) => {
    return Object.values(types_1.gender).map(g => g.toString()).includes(gend);
};
