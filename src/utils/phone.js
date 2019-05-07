function phoneNumberize(number) {
    if (!number || number.length !== 10) {
        return null;
    }

    const re = /^(\d{3})(\d{3})(\d{4})$/;
    const match = number.match(re);

    return `(${match[1]}) ${match[2]}-${match[3]}`;
}

export default phoneNumberize;
