import { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import { Button, Divider, Container, Typography } from '@mui/material';

import { apiBaseUrl } from "./constants";
import { Diagnosis, Gender, Patient, placeholderPatient } from "./types";

import SinglePatientInfo from "./components/PatientListPage/SinglePatientInfo/SinglePatientInfo";
import patientService from "./services/patients";
import PatientListPage from "./components/PatientListPage";
import diagnoseService from "./services/diagnoses";

const App = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [patient, setPatient] = useState<Patient>(placeholderPatient);
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);

  useEffect(() => {
    void axios.get<void>(`${apiBaseUrl}/ping`);

    const fetchPatientList = async () => {
      const patients = await patientService.getAll();
      setPatients(patients);
    };

    const fetchDiagnosesList = async () => {
      const diagnosesFetched = await diagnoseService.getAllDs();
      setDiagnoses(diagnosesFetched);
    };

    void fetchDiagnosesList();
    void fetchPatientList();
  }, []);

  console.log(diagnoses);

  
  
  return (
    <div className="App">
      <Router>
        <Container>
          <Typography variant="h3" style={{ marginBottom: "0.5em" }}>
            Patientor
          </Typography>
          <Button component={Link} to="/" variant="contained" color="primary">
            Home
          </Button>
          <Divider hidden />
          <Routes>
          <Route path="/" element={<PatientListPage patients={patients} setPatients={setPatients} patient={patient} setPatient={setPatient}  />} />
           
           <Route path="/api/patients/:id" element={<SinglePatientInfo patient={patient} setPatient={setPatient} diagnoses={diagnoses}  />}></Route>
          </Routes>
        </Container>
      </Router>
    </div>
  );
};

export default App;
