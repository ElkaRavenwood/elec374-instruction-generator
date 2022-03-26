import opcode_map from "./opcode_map";
import strings from "./strings";

const generate_assembly = (details) => {

  const ld_ldi = () => {
    return "R" + details[strings.instruction_info.ra] + ", " + details[strings.instruction_info.c] + 
      (details[strings.instruction_info.rb] ? ("(R" + details[strings.instruction_info.rb] + ")") : "");
  }
  const st = () => {
    return details[strings.instruction_info.c] + 
      (details[strings.instruction_info.rb] ? ("(R" + details[strings.instruction_info.rb] + ")") : "") + 
      ", R" + details[strings.instruction_info.ra];
  }
  const basic_arithmetic = () => {
    return "R"+ details[strings.instruction_info.ra] + ", " +
      "R"+ details[strings.instruction_info.rb] + ", " +
      "R"+ details[strings.instruction_info.rc];
  }
  const immediate = () => {
    return "R"+ details[strings.instruction_info.ra] + ", " +
      "R"+ details[strings.instruction_info.rb] + ", " +
      details[strings.instruction_info.c];
  }
  const complex_arithmetic = () => {
    return "R"+ details[strings.instruction_info.ra] + ", " +
      "R"+ details[strings.instruction_info.rb];
  }
  const branch = () => {
    return "R"+ details[strings.instruction_info.ra] + ", " +
      "R"+ details[strings.instruction_info.c];
  }
  const jump_inout = () => {
    return "R"+ details[strings.instruction_info.ra] + ", ";
  }
  const type = opcode_map[details[strings.instruction_info.instruction]].type;
  
  let assembly_str = details[strings.instruction_info.instruction] + " ";
  switch (type) {
    case "load_store":
      if (details[strings.instruction_info.instruction] === "st") { // if store
        assembly_str += st()
      } else { //if ld, ldi
        assembly_str += ld_ldi();
      }
      break;
    case "basic_arithmetic":
      assembly_str += basic_arithmetic();
      break;
    case "immediate":
      assembly_str += immediate();
      break;
    case "complex_arithmetic":
      assembly_str += complex_arithmetic();
      break;
    case "branch":
      assembly_str += branch();
      break;
    case "jump":
      assembly_str += jump_inout();
      break;
    case "inout":
      assembly_str += jump_inout();
      break;
    case "misc":
      break;
    default:
      break;
  }
  return assembly_str;
}

export default generate_assembly;