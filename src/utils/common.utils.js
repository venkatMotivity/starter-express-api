exports.multipleColumnSet = (object) => {
    if (typeof object !== 'object') {
        throw new Error('Invalid input');
    }

    const keys = Object.keys(object);
    const values = Object.values(object);

    columnSet = keys.map((key,index) => `${key} = ${'$'+ (index+1)}`).join(', ');

    return {
        columnSet,
        values
    }
}

// This function helps to set multiple fields for prepared queries with key value pairs.
// ColumnSet the array of key =? pairs,
// The values should therefore be in the same order as the columnSet array.