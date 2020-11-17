import { Component } from "react";
import "./Search.css";
import FoodService from "../../services/FoodService";
import SearchFacet from "../searchFacet/SearchFacet";

class Search extends Component {

  foodService = new FoodService();


  constructor() {
    super()
    this.state = {
      items: {
        data: [],
        uniqIngre: []
      }
    }

  }
  async componentDidMount() {
    
    let { meals } = await this.foodService.search('n');

    let uniqIngre = []
    let newData = meals.map(element => {

      let ingred = Object.keys(element).reduce((acc, el, i) => {
                
        let ingredient = element[`strIngredient${i + 1}`]
        let measure = element[`strMeasure${i + 1}`]

        if (i < 20 && ingredient) {
          let m = measure.match(/^[\d]+/);
          let index = uniqIngre.findIndex(e => e == ingredient);
          index == -1 && uniqIngre.push(ingredient)

          acc.push({
            name: ingredient,
            measure,
            count: m && m.length ? +m[0] : 1 
          });
        }
        return acc
      }, [])

      return {...element, ingred}
    });

    this.setState((state) => {
      return { items: { data: newData, uniqIngre } }
    })
    this.props.addItems(newData)
  }

  change = async ({target: {value}}) => {
    console.log(value);
    let data = await this.foodService.search(value)
    this.props.addItems(data && data.meals ? data.meals: 'Not Found')
  }

  changeFaset = (data) => {
    this.props.addItems(data.length ? data : 'Not Found')
  }

  render() {
    return (
      <div>
      <div className="search">
        <input className="search__input" onChange={this.change} placeholder="search" />
      </div>
        <SearchFacet changeFaset={ this.changeFaset} items={ this.state.items }/>
      </div>
    );
  }
}

export default Search;
