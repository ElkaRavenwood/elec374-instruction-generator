const opcode_map = {
    // load and store instructions
    ld: {
        opcode: "00000",
        name: "Load Direct, Load Indexed/Register Indirect",
        type: "load_store",
    },
    ldi: {
        opcode: "00001",
        name: "Load Immediate",
        type: "load_store",
    },
    st: {
        opcode: "00010",
        name: "Store Direct, Store Indexed/Register Indirect",
        type: "load_store",
    },
    // arithmetic
    add: {
        opcode: "00011",
        name: "Add",
        type: "basic_arithmetic",
    },
    sub: {
        opcode: "00100",
        name: "Sub",
        type: "basic_arithmetic",
    },
    shr: {
        opcode: "00101",
        name: "Shift Right",
        type: "basic_arithmetic",
    },
    shl: {
        opcode: "00110",
        name: "Shift Left",
        type: "basic_arithmetic",
    },
    ror: {
        opcode: "00111",
        name: "Rotate Right",
        type: "basic_arithmetic",
    },
    rol: {
        opcode: "01000",
        name: "Rotate Left",
        type: "basic_arithmetic",
    },
    and: {
        opcode: "01001",
        name: "And",
        type: "basic_arithmetic",
    },
    or: {
        opcode: "01010",
        name: "Or",
        type: "basic_arithmetic",
    },
    addi: {
        opcode: "01011",
        name: "Add Immediate",
        type: "immediate",
    },
    andi: {
        opcode: "01100",
        name: "And Immediate",
        type: "immediate",
    },
    ori: {
        opcode: "01101",
        name: "Or Immediate",
        type: "immediate",
    },
    mul: {
        opcode: "01110",
        name: "Multiply",
        type: "complex_arithmetic",
    },
    div: {
        opcode: "01111",
        name: "Divide",
        type: "complex_arithmetic",
    },
    neg: {
        opcode: "10000",
        name: "Negate",
        type: "complex_arithmetic",
    },
    not: {
        opcode: "10001",
        name: "Not",
        type: "complex_arithmetic",
    },
    // conditional branching
    brzr: {
        opcode: "10010",
        name: "branch equal zero",
        type: "branch",
        code: "00",
    },
    brnz: {
        opcode: "10010",
        name: "branch not zero",
        type: "branch",
        code: "01",
    },
    brpl: {
        opcode: "10010",
        name: "branch plus",
        type: "branch",
        code: "10",
    },
    brmi: {
        opcode: "10010",
        name: "branch minus",
        type: "branch",
        code: "11",
    },
    // Jump instructions
    jr: {
        opcode: "10011",
        name: "Jump and return from procedure",
        type: "jump",
    },
    jal: {
        opcode: "10100",
        name: "Jump and Link",
        type: "jump",
    },
    // Input/Output and MFHI/MFLO Instructions
    in: {
        opcode: "10101",
        name: "Input",
        type: "inout",
    },
    output: {
        opcode: "10110",
        name: "Output",
        type: "inout",
    },
    mfhi: {
        opcode: "10111",
        name: "Move from HI",
        type: "inout",
    },
    mflo: {
        opcode: "11000",
        name: "Move from LO",
        type: "inout",
    },
    // Misc. Instructions
    nop: {
        opcode: "11001",
        name: "No-Operation",
        type: "misc",
    },
    halt: {
        opcode: "11010",
        name: "Halt",
        type: "misc",
    },
};

export default opcode_map;