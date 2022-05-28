module.exports = {
    printWidth: 160,
    tabWidth: 4,
    singleQuote: false,
    trailingComma: "all",
    arrowParens: "always",
    overrides: [
        {
            files: "apps/vr-tests/**/*",
            options: {
                // The smaller printWidth for the screener tests promotes readability by preventing test cases
                // from being squished onto one line (and squished up against each other in consecutive lines)
                printWidth: 100,
            },
        },
        {
            // These files may be run as-is in IE 11 and must not have ES5-incompatible trailing commas
            files: ["*.html", "*.htm"],
            options: {
                trailingComma: "es5",
            },
        },
    ],
};
