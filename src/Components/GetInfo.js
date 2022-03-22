import React, {useState} from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import opcode_map  from "../opcode_map";
import generate_instruction from "../generate_instruction";
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import strings from '../Resources/strings';

const GetInfo = (params) => {

    const {onSetError, onSetInstruction} = params;

    const [instructionDetails, setInstructionDetails] = useState({
        [strings.get_info.details.instruction]: "",
        [strings.get_info.details.ra]: null,
        [strings.get_info.details.rb]: null,
        [strings.get_info.details.rc]: null,
        [strings.get_info.details.c]: null,
    });
    const [cType, setCType] = useState(10);
    const handleTextChange = (event, type) => {
        setInstructionDetails({...instructionDetails, [type]: event.target.value.replace(/\s+/g,'') || null });
    }
    const handleCTypeChange = (event) => setCType(event.target.value);
    const handleSubmitInstruction = () => {
        // console.log(instructionDetails)
        const binary = generate_instruction.bin(
            instructionDetails[strings.get_info.details.instruction], 
            instructionDetails[strings.get_info.details.ra], 
            instructionDetails[strings.get_info.details.rb], 
            instructionDetails[strings.get_info.details.rc], 
            (cType === 10) ? 
                instructionDetails[strings.get_info.details.c] : 
                parseInt(instructionDetails[strings.get_info.details.c], 16)
            )
        if (binary.error) {
            onSetError(binary.error);
        } else {
            onSetError("");
            onSetInstruction({
                hex: generate_instruction.hex(binary),
                dec: generate_instruction.dec(binary),
                bin: binary,
            });
        }
        // let instruction = instructionDetails.instruction.split(", ");
        // const first_instruction = instruction.shift();
        // instruction = [...first_instruction.split(" "), ...instruction];
        // console.log(instruction)
    }
    return (
        <Grid container item xs={12} spacing={2}>
            <Grid container item xs={12} spacing={2}>
                <Grid item xs={12} md={6}>
                    <TextField fullWidth label={strings.get_info.details.instruction} onChange={(event) => handleTextChange(event, strings.get_info.details.instruction)} />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField fullWidth disabled 
                        label={opcode_map[instructionDetails[strings.get_info.details.instruction]]? 
                            opcode_map[instructionDetails[strings.get_info.details.instruction]].name : 
                            strings.get_info.error.no_instruction
                            }
                        />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <TextField fullWidth 
                        label={strings.get_info.details.ra} 
                        onChange={(event) => handleTextChange(event, strings.get_info.details.ra)} 
                        error={isNaN(instructionDetails[strings.get_info.details.ra])} 
                        helperText={isNaN(instructionDetails[strings.get_info.details.ra]) ? strings.get_info.error.input : ""}/>
                    <br/>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <TextField fullWidth 
                        label={strings.get_info.details.rb} 
                        onChange={(event) => handleTextChange(event, strings.get_info.details.rb)} 
                        error={isNaN(instructionDetails[strings.get_info.details.rb])} 
                        helperText={isNaN(instructionDetails[strings.get_info.details.rb]) ? strings.get_info.error.input : ""}/>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <TextField fullWidth 
                        label={strings.get_info.details.rc} 
                        onChange={(event) => handleTextChange(event, strings.get_info.details.rc)} 
                        error={isNaN(instructionDetails[strings.get_info.details.rc])} 
                        helperText={isNaN(instructionDetails[strings.get_info.details.rc]) ? strings.get_info.error.input : ""}/>
                </Grid>
                <Grid item xs={8} md={10} >
                    <TextField fullWidth 
                        label={strings.get_info.details.c} 
                        onChange={(event) => handleTextChange(event, strings.get_info.details.c)} 
                        error={cType !== 16 && instructionDetails[strings.get_info.details.c] && isNaN(instructionDetails[strings.get_info.details.c])} 
                        helperText={(cType !== 16 && isNaN(instructionDetails[strings.get_info.details.c]) ? strings.get_info.error.input : "") || cType === 16 ? strings.get_info.error.invalid_C : ""}/>
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
        </Grid>
    );
};

export default GetInfo;