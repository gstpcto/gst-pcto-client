import { getCurrentYear } from 'ProvideAuth';

const genYears = (numero) => {
    const current = getCurrentYear();
    const y = parseInt(current.split("/")[1]);
    let anni = [];
    anni.push(y);
    for (let i = 1; i < 5; i++) {
        anni.push(y - i);
    }
    for (let i = 1; i < 6; i++) {
        anni.push(y + i);
    }
    anni.sort();
    anni = [...anni.map(a => `20${a - 1}/${a}`)];
    return anni;
}

export default genYears;