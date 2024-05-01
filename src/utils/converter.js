/**
 * Converts activities to an array of objects or an array of strings.
 * @param {Array|String} activities - The activities to be converted.
 * @returns {Array|String} - The converted activities.
 */
const activitiesConverter = (activities) => {
    const type = typeof activities;
    if (type === 'string') {
        const data = JSON.parse(activities);
        const arrOfActivities = data.map((item, index) => item[index]);
        return arrOfActivities;
    } else if (type === 'object') {
        const arrOfActivities = activities.map((item, key) => ({ [key]: item }))
        return JSON.stringify(arrOfActivities);
    }
    return [];
}




export {
    activitiesConverter
}