const strings = {
  site_title: "ELEC 374 Instruction Encoder",
  git_link: "https://github.com/ElkaRavenwood/elec374-instruction-generator/",
  instructions: "Enter the part of the instruction in the appropriate field. Note that for registers, just the number is needed. Click the submit button when you're done. The generated instruction is below in hex, binary and decimal.",
  get_info: {
    error: {
      input: "Invalid input. Did you type letters or spaces in the field?",
      invalid_C: "Make sure you have the right symbols in here.",
      missing_C: "C value missing for instruction.",
      missing_register: "Register missing for instruction.",
      no_instruction: "No information.",
    },
    details: {
      instruction: "Instruction",
      ra: "RA",
      rb: "RB",
      rc: "RC",
      c: "C",
    },
  },
  footer: {
    disclaimer: "ElkaRavenwood assumes no liability for any inaccuracies, errors or omissions in the content of this site. If an error is noted, feel free to make a PR and they will review it ... eventually. The link to the repo is in the Copyright. Good luck with your assignment!",
  },
  results: {
    results: "Results",
    hexadecimal: "Hexadecimal",
    decimal: "Decimal",
    binary: "Binary",
    error: "Error Message",
  },
  calculations: {
    missing_register:"Register missing for instruction.",
    missing_c:"C value missing for instruction.",
  },
}

export default strings;