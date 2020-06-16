export default {
    getEmptyMatrix(len) {
        const res = [];
        for (let i = 0; i < len; i++) {
            const row = [];
            for (let j = 0; j < len; j++) {
                row.push(0);
            }

            res.push(row);
        }

        return res;
    },

    copyMatrix(m) {
        const cp = [];
        m.forEach(row => {
            const rowCp = [...row];
            cp.push(rowCp);
        });

        return cp;
    },

    toFixed(val, count) {
        const strVal = val.toString();
        const indexDot = strVal.indexOf(".");
        if (indexDot === -1) {
            return val;
        }

        return Number.parseFloat(strVal.substring(0, indexDot + count + 1));
    },

    logMatrix(m) {
        console.log(m.map(item => item.join(" ")).join("\n"));
    }
}