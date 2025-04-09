import { InputLabel, TextField, Grid, Button, MenuItem, Select, SelectChangeEvent, Chip, ListItem, Paper, Alert } from "@mui/material";
import React, {  useState } from "react";
import { Diagnosis, Entry, HealthCheckRating } from "../../../../types";
import TagFacesIcon from '@mui/icons-material/TagFaces';


enum EntryTypes {
  Hospital = 'Hospital',
  HealthCheck ='HealthCheck',
  OccupationalHealthcare = 'OccupationalHealthcare',
  
  
}

interface FormInfo {
  diagnoses: Diagnosis[]
  submitEntry: (entry: Entry) => void;

}




const NewEntryForm = ({diagnoses, submitEntry}: FormInfo): JSX.Element => {
  const [entryType,setEntryType] = useState<EntryTypes>(EntryTypes.HealthCheck);
  
  const [hideEntryAdd,setHideEntryAdd] = useState(true);
  
  
  const [description,setDescription]= useState('');
  const [date,setDate]= useState('');
  const [specialist,setSpecialist]= useState('');
  const [diagnosesAdded,setDiagnosesAdded]= useState<Diagnosis[]>([]);
  
  const [healthCheckRating,setHealthCheckRating]= useState<HealthCheckRating>(HealthCheckRating.Healthy);
  
  const [dischargeDate,setdischargeDate]= useState("");
  const [criteria,setCriteria]= useState("");
  
  const [startDate,setStartDate]= useState("");
  const [endDate,setEndDate]= useState("");
  const [employer,setEmployer]= useState("");
  
  
  const handleBasicEvents =(state: React.Dispatch<React.SetStateAction<string>>,event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>  ) => {
    event.preventDefault();
    state(event.target.value);
  };
   

  const handleEntryType = (event: SelectChangeEvent<EntryTypes> ) =>{
    event.preventDefault()
    const entryFormat = event.target.value as EntryTypes
    setEntryType(entryFormat)
    console.log(entryFormat)
  }

  const handleHealthCheck = (event: SelectChangeEvent<HealthCheckRating>) => {
    event.preventDefault();
    if(event.target.value){
      setHealthCheckRating(Number(event.target.value) as HealthCheckRating);

    } else {
      throw new Error("Healthcheck rating is incorrect!");
    }
  };

  const findDiagnosis = (diagnoseInString: string):Diagnosis => {

    const code:string = diagnoseInString.split(" ")[0].trim() as string;
    console.log(code);
    if(code){
      const found =  diagnoses.find(d => d.code === code);
      if(found){
        return found;

      } else {
        throw new Error("Diagnosis not found list!");

      }
    } else {
      throw new Error("Diagnosis code not found!");
      
    }
  
  };
  
  const handleDiagnoses = (event: SelectChangeEvent<string>, diagnose: Diagnosis) => {
    event.preventDefault();    
    if(diagnose){
      console.log(diagnosesAdded);

      if(!diagnosesAdded.find(d => d.code === diagnose.code)){
        setDiagnosesAdded(diagnosesAdded.concat(diagnose));
      
      }
      
    }
   
  };
  const createEntryBase = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const baseEntry = { description,
      date,
      specialist,
      diagnosisCodes:diagnosesAdded.map(d => d.code),
      type:entryType
    } as Entry;
    switch (entryType) {
      case 'HealthCheck':
        const healthCheckEntry = {HealthCheckRating:healthCheckRating,...baseEntry};
        console.log(healthCheckEntry,'this');

        submitEntry(healthCheckEntry);
        break;
      
      case 'Hospital':
        const hospitalEntry = 
        { discharge: {
            date: dischargeDate,
            criteria
        },...baseEntry};
    
        submitEntry(hospitalEntry);
        break;

      case 'OccupationalHealthcare':
          const OccupationalEntry = { 
            sickLeave: {
              startDate:startDate,
              endDate:endDate,
              employerName: employer

          },...baseEntry};
      
          submitEntry(OccupationalEntry);
          break;

      default:
        submitEntry(baseEntry)
        break;
    }
    
    return {healthCheckRating,...baseEntry};
  };

  

  return (hideEntryAdd? <div>
                 <Button
                  style={{
                    float: "left",
                  }}
                  onClick={()=> {setHideEntryAdd(false);}}
                  variant="contained"
                >
                  Add
                </Button>
    
  </div>:
  <div>
    <h3>New Entry</h3>
        <form onSubmit={(e) => createEntryBase(e)} >
        
          <InputLabel style={{ marginTop: 20 }}>Description</InputLabel>
    
          <TextField
            label="Description"
            fullWidth 
            value={description}
            onChange={(e) => handleBasicEvents(setDescription,e)}
          />
          <InputLabel style={{ marginTop: 20 }}>Date</InputLabel>
        
          <input
              type="date"
              id="start"
              name="trip-start"
              min="2018-01-01"
              max="2030-12-31"
              value={date}
              onChange={(e) => handleBasicEvents(setDate,e)}
            />
          <InputLabel style={{ marginTop: 20 }}>Specialist</InputLabel>
    
          <TextField
              label="Specialist"
              fullWidth 
              value={specialist}
              onChange={(e) => handleBasicEvents(setSpecialist,e)}
            />
          <InputLabel style={{ marginTop: 20 }}>Diagnosis codes</InputLabel>
          {}
          {GenerateDiagnosisButton(diagnosesAdded,setDiagnosesAdded)}
          <Select
            label="Diagnoses"
            fullWidth
            value={"Set type"}
            onChange={(e)=> handleDiagnoses(e,findDiagnosis(e.target.value))}
          >
           {diagnoses.map(option =>
                     <MenuItem
                       key={option.code}
                       value={option.code + " "+ option.name}
                     >
                       {option.code +  " " + option.name}
                       </MenuItem>
                   )}
          </Select>
          <InputLabel style={{ marginTop: 20 }}>Type</InputLabel>

          <Select
            label="Type"
            autoWidth={true}
            value={entryType}
            onChange={(e)=> handleEntryType(e)}
            
          >
           {Object.keys(EntryTypes).map(option =>
                     <MenuItem
                       key={option.valueOf()}
                       value={option.valueOf()}
                     >
                       {option}
                       </MenuItem>
                   )}
          </Select>
        
        { TypeAdditions(entryType,
        healthCheckRating,handleHealthCheck,
        criteria,setCriteria,
        dischargeDate,setdischargeDate,
        startDate,
        setStartDate,
        endDate,
        setEndDate,
        employer,
        setEmployer)}
          <Grid>
              <Grid item>
                <Button
                  color="secondary"
                  variant="contained"
                  style={{ float: "left" }}
                  type="button"
                  onClick={()=> {setHideEntryAdd(true);}}
                >
                  Cancel
                </Button>
              </Grid>
              <Grid item>
                <Button
                  style={{
                    float: "right",
                  }}
                  type="submit"
                  variant="contained"
                >
                  Add
                </Button>
              </Grid>
            </Grid>
    
       </form>
  </div>);
};


const TypeAdditions = (entry:EntryTypes, 
  healthCheckRating:HealthCheckRating, 
  handleHealthCheck: (event: SelectChangeEvent<HealthCheckRating>) => void,
  criteria: string,
  setCriteria: React.Dispatch<React.SetStateAction<string>>,
  dischargeDate:string,
  setDischargeDate: React.Dispatch<React.SetStateAction<string>>,
  startDate:string,
  setStartDate: React.Dispatch<React.SetStateAction<string>>,
  endDate:string,
  setEndDate: React.Dispatch<React.SetStateAction<string>>,
  employer:string,
  setEmployer: React.Dispatch<React.SetStateAction<string>>,
  

): JSX.Element => {

  switch (entry){
    case EntryTypes.HealthCheck:
      return (<div>
        <InputLabel style={{ marginTop: 20 }}>Healthcheck rating</InputLabel>
        <Select
            label="HealthCheck"
            fullWidth
            value={healthCheckRating}
            onChange={(e)=>  handleHealthCheck(e)}
          >
           {
           Object.values(HealthCheckRating).filter(type => typeof type === 'number').map(option =>
                     <MenuItem
                       key={option}
                       value={option}
                     >
                       {option}
                       </MenuItem>
                   )}
          </Select>
      </div>);
      case EntryTypes.Hospital:
        return (<div>
          <InputLabel style={{ marginTop: 20 }}>Discharge</InputLabel>
          Date: <input
              type="date"
              id="start"
              name="trip-start"
              min="2018-01-01"
              max="2030-12-31" value={dischargeDate}  onChange={(e) => {setDischargeDate(e.target.value);}} ></input>
          <InputLabel style={{ marginTop: 20 }}>Criteria</InputLabel>
          <TextField
              label="Criteria"
              fullWidth
              defaultValue={""}
              value={criteria}
              onChange={(e) =>  setCriteria(e.target.value)}
            />
        </div>);
        case EntryTypes.OccupationalHealthcare:
          return  (<div>
            <InputLabel style={{ marginTop: 20 }}>Sickleave</InputLabel>
            <h4>Startdate:</h4> <input
                type="date"
                id="start"
                name="trip-start"
                min="2018-01-01"
                max="2030-12-31" value={startDate}  onChange={(e) => {setStartDate(e.target.value);}} ></input>
            <InputLabel style={{ marginTop: 20 }}>Criteria</InputLabel>
            <h4>Enddate:</h4> <input
                type="date"
                id="start"
                name="trip-start"
                min="2018-01-01"
                max="2030-12-31" value={endDate}  onChange={(e) => {setEndDate(e.target.value);}} ></input>
                 <InputLabel style={{ marginTop: 20 }}>Employer name</InputLabel>
          <TextField
              label="employer"
              fullWidth
              value={employer}
              onChange={(e) =>  setEmployer(e.target.value)}
            />
          </div>);


    default:
      return <div></div>;
  }

};


const GenerateDiagnosisButton = (DiagnosesAdded: Diagnosis[],setDiagnosesAdded: React.Dispatch<React.SetStateAction<Diagnosis[]>>):JSX.Element => {
  

  const handleDelete = (diagnosis: Diagnosis) => () => {
    setDiagnosesAdded((diag) => diag.filter((diag) => diag.code !== diagnosis.code));
  };

  return (
    <Paper
      sx={{
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        listStyle: 'none',
        p: 0.5,
        m: 0,
      }}
      component="ul"
    >
      {DiagnosesAdded.map((data) => {
        const icon = <TagFacesIcon />;
        

        return (
          <ListItem key={data.code+" itemList"}>
            <Chip
              icon={icon}
              label={data.code + ": "+data.name}
              onDelete={handleDelete(data)}
            />
          </ListItem>
        );
      })}
    </Paper>
  );
};


export default NewEntryForm;