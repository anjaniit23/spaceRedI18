export function countKeys(jsonObject) {
    let keyCount = 0;

    function count(obj) {
        for (let key in obj) {
            if (obj.hasOwnProperty(key)) {
                keyCount++;
                if (typeof obj[key] === 'object' && obj[key] !== null) {
                    count(obj[key]);
                }
            }
        }
    }

    count(jsonObject);
    return keyCount;
}