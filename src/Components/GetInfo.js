import React, {useState} from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import opcode_map  from "../opcode_map";
import generate_instruction from "../generate_instruction";
import { Grid, MenuItem, Select, Typography } from '@mui/material';
const GetInfo = () => {

    const [instructionDetails, setInstructionDetails] = useState({
        [process.env.REACT_APP_GETINFO_INSTRUCTION_DETAILS_INSTRUCTION]: "",
        [process.env.REACT_APP_GETINFO_INSTRUCTION_DETAILS_RA]: null,
        [process.env.REACT_APP_GETINFO_INSTRUCTION_DETAILS_RB]: null,
        [process.env.REACT_APP_GETINFO_INSTRUCTION_DETAILS_RC]: null,
        [process.env.REACT_APP_GETINFO_INSTRUCTION_DETAILS_C]: null,
    });
    const [instruction, setInstruction] = useState({
        hex: "",
        binary: "",
    });
    const [cType, setCType] = useState(10);
    const [error, setError] = useState("");
    const handleTextChange = (event, type) => {
        setInstructionDetails({...instructionDetails, [type]: event.target.value || null });
    }
    const handleCTypeChange = (event) => setCType(event.target.value);
    const handleSubmitInstruction = () => {
        // console.log(instructionDetails)
        const binary = generate_instruction.binary(
            instructionDetails[process.env.REACT_APP_GETINFO_INSTRUCTION_DETAILS_INSTRUCTION], 
            instructionDetails[process.env.REACT_APP_GETINFO_INSTRUCTION_DETAILS_RA], 
            instructionDetails[process.env.REACT_APP_GETINFO_INSTRUCTION_DETAILS_RB], 
            instructionDetails[process.env.REACT_APP_GETINFO_INSTRUCTION_DETAILS_RC], 
            (cType === 10) ? 
                instructionDetails[process.env.REACT_APP_GETINFO_INSTRUCTION_DETAILS_C] : 
                parseInt(instructionDetails[process.env.REACT_APP_GETINFO_INSTRUCTION_DETAILS_C], 16)
            )
        if (binary.error) {
            setError(binary.error);
        } else {
            setError("");
            setInstruction({
                hex: generate_instruction.hex(binary),
                binary: binary,
            });
        }
        // let instruction = instructionDetails.instruction.split(", ");
        // const first_instruction = instruction.shift();
        // instruction = [...first_instruction.split(" "), ...instruction];
        // console.log(instruction)
    }
    return (
        <Box>
            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                    <TextField fullWidth label={process.env.REACT_APP_GETINFO_INSTRUCTION_DETAILS_INSTRUCTION} onChange={(event) => handleTextChange(event, process.env.REACT_APP_GETINFO_INSTRUCTION_DETAILS_INSTRUCTION)} />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField fullWidth disabled 
                        label={opcode_map[instructionDetails[process.env.REACT_APP_GETINFO_INSTRUCTION_DETAILS_INSTRUCTION]]? 
                            opcode_map[instructionDetails[process.env.REACT_APP_GETINFO_INSTRUCTION_DETAILS_INSTRUCTION]].name : 
                            "No Description"
                            }
                        />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <TextField fullWidth 
                        label={process.env.REACT_APP_GETINFO_INSTRUCTION_DETAILS_RA} 
                        onChange={(event) => handleTextChange(event, process.env.REACT_APP_GETINFO_INSTRUCTION_DETAILS_RA)} 
                        error={isNaN(instructionDetails[process.env.REACT_APP_GETINFO_INSTRUCTION_DETAILS_RA])} 
                        helperText={isNaN(instructionDetails[process.env.REACT_APP_GETINFO_INSTRUCTION_DETAILS_RA]) ? process.env.REACT_APP_GETINFO_REGISTER_INPUT_ERROR : ""}/>
                    <br/>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <TextField fullWidth 
                        label={process.env.REACT_APP_GETINFO_INSTRUCTION_DETAILS_RB} 
                        onChange={(event) => handleTextChange(event, process.env.REACT_APP_GETINFO_INSTRUCTION_DETAILS_RB)} 
                        error={isNaN(instructionDetails[process.env.REACT_APP_GETINFO_INSTRUCTION_DETAILS_RB])} 
                        helperText={isNaN(instructionDetails[process.env.REACT_APP_GETINFO_INSTRUCTION_DETAILS_RB]) ? process.env.REACT_APP_GETINFO_REGISTER_INPUT_ERROR : ""}/>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <TextField fullWidth 
                        label={process.env.REACT_APP_GETINFO_INSTRUCTION_DETAILS_RC} 
                        onChange={(event) => handleTextChange(event, process.env.REACT_APP_GETINFO_INSTRUCTION_DETAILS_RC)} 
                        error={isNaN(instructionDetails[process.env.REACT_APP_GETINFO_INSTRUCTION_DETAILS_RC])} 
                        helperText={isNaN(instructionDetails[process.env.REACT_APP_GETINFO_INSTRUCTION_DETAILS_RC]) ? process.env.REACT_APP_GETINFO_REGISTER_INPUT_ERROR : ""}/>
                </Grid>
                <Grid item xs={8} md={10} >
                    <TextField fullWidth 
                        label={process.env.REACT_APP_GETINFO_INSTRUCTION_DETAILS_C} 
                        onChange={(event) => handleTextChange(event, process.env.REACT_APP_GETINFO_INSTRUCTION_DETAILS_C)} 
                        error={cType !== 16 && instructionDetails[process.env.REACT_APP_GETINFO_INSTRUCTION_DETAILS_C] && isNaN(instructionDetails[process.env.REACT_APP_GETINFO_INSTRUCTION_DETAILS_C])} 
                        helperText={(cType !== 16 && isNaN(instructionDetails[process.env.REACT_APP_GETINFO_INSTRUCTION_DETAILS_C]) ? process.env.REACT_APP_GETINFO_REGISTER_INPUT_ERROR : "") || cType === 16 ? process.env.REACT_APP_GETINFO_INSTRUCTION_INVALID_C : ""}/>
                </Grid>
                <Grid item xs={4} md={2}>
                    <Select value={cType} onChange={handleCTypeChange} fullWidth>
                        <MenuItem value={10}>Decimal</MenuItem>
                        <MenuItem value={16}>Hexadecimal</MenuItem>
                    </Select>
                </Grid>
                <Grid item xs={12}>
                    <Button onClick={handleSubmitInstruction} variant="outlined">Submit Instruction</Button> 
                </Grid>
            </Grid>

            <br/>
            <Grid container spacing={2}>
                <Grid item lg={1} xl={2}/>
                <Grid item container spacing={2} lg={10} xl={8}>
                    <Grid item xs={12}><Typography variant="h5">Results:</Typography></Grid>
                    <Grid item xs={6}><Typography variant="h6">Hex:</Typography></Grid>
                    <Grid item xs={6}><Typography variant="h6">{instruction.hex}</Typography></Grid>
                    <Grid item xs={6}><Typography variant="h6">Binary:</Typography></Grid>
                    <Grid item xs={6}><Typography >{instruction.binary}</Typography></Grid>
                    { error ? <>
                        <Grid item xs={6}><Typography variant="h6">Error Message:</Typography></Grid>
                        <Grid item xs={6}><Typography variant="h6">{error}</Typography></Grid>
                        </> : null
                    }
                </Grid>
                <Grid item lg={1} xl={2}/>
            </Grid>
        </Box>
    );
};

export default GetInfo;