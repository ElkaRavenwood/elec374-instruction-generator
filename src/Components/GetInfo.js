import React, {useState} from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import opcode_map  from "../Resources/opcode_map";
import generate_instruction from "../Resources/generate_instruction";
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import generate_assembly from '../Resources/generate_assembly';
import strings from '../Resources/strings';

const GetInfo = (params) => {

    const {onSetError, onSetInstruction, onSetHistory} = params;

    const [instructionDetails, setInstructionDetails] = useState({
        [strings.instruction_info.instruction]: "",
        [strings.instruction_info.ra]: null,
        [strings.instruction_info.rb]: null,
        [strings.instruction_info.rc]: null,
        [strings.instruction_info.c]: null,
    });
    const [cType, setCType] = useState(10);
    const handleTextChange = (event, type) => {
        setInstructionDetails({...instructionDetails, [type]: event.target.value.replace(/\s+/g,'') || null });
    }
    const handleCTypeChange = (event) => setCType(event.target.value);
    const handleSubmitInstruction = () => {
        // console.log(instructionDetails)
        const binary = generate_instruction.bin(
            instructionDetails[strings.instruction_info.instruction], 
            instructionDetails[strings.instruction_info.ra], 
            instructionDetails[strings.instruction_info.rb], 
            instructionDetails[strings.instruction_info.rc], 
            (cType === 10) ? 
                instructionDetails[strings.instruction_info.c] : 
                parseInt(instructionDetails[strings.instruction_info.c], 16)
            );
        if (binary.error) {
            onSetError(binary.error);
        } else {
            onSetError("");
            onSetInstruction({
                hex: generate_instruction.hex(binary),
                dec: generate_instruction.dec(binary),
                bin: binary,
            });
            onSetHistory((history) => [{
                [strings.results.hexadecimal]: generate_instruction.hex(binary),
                [strings.results.decimal]: generate_instruction.dec(binary),
                [strings.results.binary]: binary,
                [strings.instruction_info.instruction]: generate_assembly(instructionDetails),
                [strings.results.c_type]: cType,
            }, ...history])
        }
    }

    const get_c_error = () => {
        if (cType === 10) { // decimal
            if (instructionDetails[strings.instruction_info.c] && isNaN(instructionDetails[strings.instruction_info.c])) return true;
        } else {
            if (parseInt(instructionDetails[strings.instruction_info.c], 16).toString(16) !== instructionDetails[strings.instruction_info.c]) return true;
        }
    }
    const get_c_helper_text = () => {
        if (cType === 10) {
            if (isNaN(instructionDetails[strings.instruction_info.c])) return strings.get_info.error.input
        } else {
            if (parseInt(instructionDetails[strings.instruction_info.c], 16).toString(16) !== instructionDetails[strings.instruction_info.c]) return strings.get_info.error.invalid_hex;
        }
    }
    return (
        <Grid container item xs={12} spacing={2}>
            <Grid container item xs={12} spacing={2}>
                <Grid item xs={12} md={6}>
                    <TextField fullWidth label={strings.instruction_info.instruction} onChange={(event) => handleTextChange(event, strings.instruction_info.instruction)} />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField fullWidth disabled 
                        label={opcode_map[instructionDetails[strings.instruction_info.instruction]]? 
                            opcode_map[instructionDetails[strings.instruction_info.instruction]].name : 
                            strings.get_info.error.no_instruction
                            }
                        />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <TextField fullWidth 
                        label={strings.instruction_info.ra} 
                        onChange={(event) => handleTextChange(event, strings.instruction_info.ra)} 
                        error={isNaN(instructionDetails[strings.instruction_info.ra])} 
                        helperText={isNaN(instructionDetails[strings.instruction_info.ra]) ? strings.get_info.error.input : ""}/>
                    <br/>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <TextField fullWidth 
                        label={strings.instruction_info.rb} 
                        onChange={(event) => handleTextChange(event, strings.instruction_info.rb)} 
                        error={isNaN(instructionDetails[strings.instruction_info.rb])} 
                        helperText={isNaN(instructionDetails[strings.instruction_info.rb]) ? strings.get_info.error.input : ""}/>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <TextField fullWidth 
                        label={strings.instruction_info.rc} 
                        onChange={(event) => handleTextChange(event, strings.instruction_info.rc)} 
                        error={isNaN(instructionDetails[strings.instruction_info.rc])} 
                        helperText={isNaN(instructionDetails[strings.instruction_info.rc]) ? strings.get_info.error.input : ""}/>
                </Grid>
                <Grid item xs={8} md={10} >
                    <TextField fullWidth 
                        label={strings.instruction_info.c} 
                        onChange={(event) => handleTextChange(event, strings.instruction_info.c)} 
                        error={get_c_error()} 
                        helperText={get_c_helper_text()}/>
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