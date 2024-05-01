

function handleAddress(city, country, loading) {

    if (loading) {
        return 'Loading...';
    }
    if (city && country) {
        return `${city}, ${country}`;
    } else if (city && !country) {
        return `${city}`;
    } else if (!city && country) {
        return `${country}`;
    } else {
        return '';
    }
}

export default handleAddress;