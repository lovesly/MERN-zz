const isEmpty = value => {
    return (
        !value || 
        (typeof value === 'object' && Object.keys(value).length === 0) ||
        (typeof value === 'string' && value.trim().length === 0)
    );
}

 export default isEmpty;