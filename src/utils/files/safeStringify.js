// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Errors/Cyclic_object_value

const getCircularReplacer = () => {
    const seen = new WeakSet();
    return (_key, value) => {
        if (typeof value === 'object' && value !== null) {
            if (seen.has(value)) {
                return;
            }
            seen.add(value);
        }
        // eslint-disable-next-line consistent-return
        return value;
    };
};

export const safeStringify = (object) => JSON.stringify(object, getCircularReplacer());
