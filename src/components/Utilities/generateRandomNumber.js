const generateRandomNumber = (array, maxN) =>  {
    let randomN = Math.floor(Math.random() * maxN) + 0;

    if(array.includes(randomN)) {
        return generateRandomNumber(array, maxN);
    }

    if(array.push(randomN) == maxN) {
        array.length = 0;
    }
    
    return randomN

}

export default generateRandomNumber