const fs = require('fs');
const results = require("./results.json");
const newResults = [];
results.forEach(result => {
    if (result.errors) {
        let vrt = 0;
        if (result.changes) {
            vrt = result.changes.length;
        }
        let testErrors = 0;
        if (result.errorTests) {
            testErrors = result.errorTests;
            if (testErrors < 0) {
                testErrors = testErrors * -1;
            }
        }

        if ((testErrors + vrt) > result.errors) {
            result.errorTests = result.errors - vrt;
        }
    } else {
        result.errorTests = 0;
    }
    newResults.push(result);
});
fs.writeFile("results.json", JSON.stringify(newResults), (err) => {
    console.log(err);
});
