
function emailValidator(email) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return !emailRegex.test(email)
}

function phoneValidator(phoneNumber) {
    const phoneRegex = /^\d+$/;
    return !phoneRegex.test(phoneNumber)
}

function zipCodeValidator(zipCode) {
    return !(zipCode?.length >= 4 && typeof Number(zipCode) === 'number');
}

export { emailValidator, phoneValidator, zipCodeValidator };