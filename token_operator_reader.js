// ... existing code ...
const C_KEYWORDS = new Set([
    // Storage class specifiers
    'auto', 'register', 'static', 'extern', 'typedef',

    // Type specifiers
    'void', 'char', 'short', 'int', 'long', 'float', 'double', 'signed', 'unsigned',
    '_Bool', '_Complex', '_Imaginary',

    // Type qualifiers
    'const', 'restrict', 'volatile',

    // Struct/Union/Enum
    'struct', 'union', 'enum',

    // Control flow
    'if', 'else', 'switch', 'case', 'default',
    'while', 'do', 'for',
    'goto', 'continue', 'break', 'return',

    // Other
    'sizeof', 'inline'
]);
// ... existing code ...

    readOperator() {
        const startLine = this.currentLine;
        const startColumn = this.currentColumn;
        let char = this.sourceCode[this.position];
        let nextChar = this.sourceCode[this.position + 1] || '';
        let thirdChar = this.sourceCode[this.position + 2] || '';

        // Three-character operators
        const tripleOps = ['<<=', '>>='];
        if (tripleOps.includes(char + nextChar + thirdChar)) {
            this.position += 3;
            this.currentColumn += 3;
            return { type: TokenType.OPERATOR, value: char + nextChar + thirdChar, line: startLine, column: startColumn };
        }

        // Two-character operators
        const doubleOps = [
            '==', '!=', '<=', '>=',          // Relational
            '&&', '||',                       // Logical
            '++', '--',                       // Increment/Decrement
            '+=', '-=', '*=', '/=', '%=',    // Compound assignment
            '&=', '|=', '^=',                // Bitwise compound assignment
            '<<', '>>',                       // Bit shift
            '->'                              // Member access
        ];

        if (doubleOps.includes(char + nextChar)) {
            this.position += 2;
            this.currentColumn += 2;
            return { type: TokenType.OPERATOR, value: char + nextChar, line: startLine, column: startColumn };
        }

        // Single-character operators
        // + - * / % = < > ! & | ^ ~ ? :
        this.position++;
        this.currentColumn++;
        return { type: TokenType.OPERATOR, value: char, line: startLine, column: startColumn };
    }
// ... existing code ...
