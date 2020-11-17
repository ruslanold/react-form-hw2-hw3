export default class FoodService {

  url = 'https://www.themealdb.com/api/json/v1/1/'

  country

  search(query) {
    
    return fetch(`${this.url}search.php?s=${query}`)
      .then(v => {
        return v.json()
      })
      .catch(e => {
        return null
      })
  }

  getAllIngredients() {
    return fetch(`${this.url}list.php?i=list`).then( v => v.json())
  }
  
  getByIngredient(ingredient) {
    return fetch(`${this.url}filter.php?i=${ingredient}`).then( v => v.json())
  }
  
  getByCountry(country) {
    return fetch(`${this.url}filter.php?a=${country}`).then( v => v.json())
  }
}