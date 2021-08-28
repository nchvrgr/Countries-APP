
export function alphaAsc(array){
    return array.sort( (a, b) => {
        return a.name > b.name ? 1 : -1
    });
}

export function alphaDesc(array){
    return array.sort( (a, b) => {
        return a.name < b.name ? 1: -1
    });
}

export function populationAsc(array){
    return array.sort( (a, b) => {
        return b.population - a.population
    });
}

export function populationDesc(array){
    return array.sort( (a, b) => {
        return a.population - b.population
    });
}

export function filterAll(array, continent){
    return array.filter(country => country.continent === continent);
}

export function filterAmericas(array){
    return array.filter( country => country.continent === "Americas");
}

export function filterEurope(array){
    return array.filter( country => country.continent === "Europe");
}

export function filterAsia(array){
    return array.filter( country => country.continent === "Asia");
}

export function filterOceania(array){
    return array.filter( country => country.continent === "Oceania");
}

export function filterAfrica(array){
    return array.filter( country => country.continent === "Africa");
}

export function filterPolar(array){
    return array.filter( country => country.continent === "Polar");
}

export function filterUndefined(array){
    return array.filter( country => country.continent === "Undefined");
}