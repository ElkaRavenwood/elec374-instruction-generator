import opcode_map  from "./opcode_map";
// Gets register in binary
function dec2bin_Register(dec) {
  if (dec === null) return dec; // if null, just return ut
  if (dec > 15) return {status: "error", text: "Register too large"}
  if (dec < 0) return {status: "error", text: "No negative registers"}
  let bin_str = (dec >>> 0).toString(2);
  let bin_str_head = "";
  while (bin_str_head.length < (4 - bin_str.length)) {
    bin_str_head += "0";
  }
  return bin_str_head + bin_str;
}

// gets c value
// assume extend with zeros
// dec - the value
// bits - number of bits it should be when converted to binary
function dec2bin_C(dec, bits) {
  if (dec === null) return dec; // if null, just return ut
  let bin_str = (dec >>> 0).toString(2);
  let bin_str_head = "";
  while (bin_str_head.length < (bits - bin_str.length)) {
    bin_str_head += "0";
  }
  return bin_str_head + bin_str;
}

// Fills in zeros at end of instruction
const fill_in_zeros = (instruction_string) => {
  while (instruction_string.length < 32) {
    instruction_string += "0";
  }
  return instruction_string;
}

// instruction - assembly instruction
// ra, rb, rc - ints from 0 - 15; or null if not used
// C - int value
// if instructions dont use rX or C, when collecting info, will default to null
const generate_instruction_bin = (instruction, ra, rb, rc, C) => {
  // Error checking
  let error = "";
  if (!opcode_map[instruction.toLowerCase()]) {
    error += "Invalid Instruction\n";
  }
  ra = dec2bin_Register(ra);
  rb = dec2bin_Register(rb);
  rc = dec2bin_Register(rc);

  if (ra && ra.text) {
    error += ra.text + "\n";
  }
  if (rb && rb.text) {
    error += rb.text + "\n";
  }
  if (rc && rc.text) {
    error += rc.text + "\n";
  }

  if (error !== "") {
    console.log(error)
    return {error};
  }

  // Instruction Generation
  instruction = opcode_map[instruction.toLowerCase()];
  const opcode = instruction.opcode;
  let converted_instruction = opcode;
  const instruction_type = instruction.type;
  switch(instruction_type) {
    case "load_store":
      if (!ra) return {error: process.env.REACT_APP_CALCULATIONS_MISSING_REGISTER}
      if (!C) return {error: process.env.REACT_APP_CALCULATIONS_MISSING_C}
      converted_instruction += ra + (rb ? rb : "0000") + dec2bin_C(C, 19)
      break;
    case "basic_arithmetic":
      if (!ra || !rb || !rc) return {error: process.env.REACT_APP_CALCULATIONS_MISSING_REGISTER}
      converted_instruction += ra + rb + rc;
      converted_instruction = fill_in_zeros(converted_instruction);
      break;
    case "immediate":
      if (!ra || !rb) return {error: process.env.REACT_APP_CALCULATIONS_MISSING_REGISTER}
      if (!C) return {error: process.env.REACT_APP_CALCULATIONS_MISSING_C}
      converted_instruction += ra + rb + dec2bin_C(C, 19);
      break;
    case "complex_arithmetic":
      if (!ra || !rb) return {error: process.env.REACT_APP_CALCULATIONS_MISSING_REGISTER}
      converted_instruction += ra + rb;
      converted_instruction = fill_in_zeros(converted_instruction);
      break;
    case "branch":
      if (!ra) return {error: process.env.REACT_APP_CALCULATIONS_MISSING_REGISTER}
      if (!C) return {error: process.env.REACT_APP_CALCULATIONS_MISSING_C}
      converted_instruction += ra + "00" + instruction.code + dec2bin_C(C, 19);
      break;
    case "jump":
      if (!ra) return {error: process.env.REACT_APP_CALCULATIONS_MISSING_REGISTER}
      converted_instruction += ra;
      converted_instruction = fill_in_zeros(converted_instruction);
      break;
    case "inout":
      if (!ra) return {error: process.env.REACT_APP_CALCULATIONS_MISSING_REGISTER}
      converted_instruction += ra;
      converted_instruction = fill_in_zeros(converted_instruction);
      break;
    case "misc":
      converted_instruction = fill_in_zeros(converted_instruction);
      break;
    default :
      break;
  }
  return converted_instruction;
}

const generate_instruction_hex = (binary_instruction) => {
  let hex_instruction = parseInt(binary_instruction, 2).toString(16).toUpperCase();
  while (hex_instruction.length < 8) hex_instruction = "0" + hex_instruction;
  return hex_instruction;
}

const generate_instruction_dec = (binary_instruction) => {
  return parseInt(binary_instruction, 2);
}

// testing
// let t = generate_instruction_bin("ldi", 3, null, null, 135);
// console.log(t)
// console.log(t.length)
// t = parseInt(t, 2).toString(16).toUpperCase();
// console.log(t)

const generate_instruction = {
  bin: generate_instruction_bin,
  hex: generate_instruction_hex,
  dec: generate_instruction_dec,
};

export default generate_instruction;