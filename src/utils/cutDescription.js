const cutDescription = (description) => {
    if (description?.length > 65) {
        return description.slice(0, 65) + '...';
    }
    return description;
};
export default cutDescription;