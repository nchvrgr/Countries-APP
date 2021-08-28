function convertActivity(activity) {
    return {
      id: activity.id, 
      name: activity.name,
      difficulty: activity.difficulty,
      duration: activity.duration,
      season: activity.duration
    };
  }

function convertCountry(country) {
    return {
      id: country.alpha3Code || 'AAA',
      name: country.name || 'AAA',
      image: country.flag || 'AAA',
      continent: country.region || 'Undefined',
      subregion: country.subregion || 'AAA',
      capital: country.capital || 'AAA',
      area: country.area || 0,
      population: country.population || 0
    };
  }

  module.exports = {
      convertCountry, convertActivity
  }