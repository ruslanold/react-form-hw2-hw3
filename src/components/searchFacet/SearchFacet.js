import React, { Component } from "react";
import "./SearchFacet.css";
import FoodService from "../../services/FoodService";
import InputRange from "../inputRange/InputRange";
import { category } from "../../constants";

class SearchFacet extends Component {
  foodService = new FoodService();

  state = {
    selectedIngredients: [],
  };

  change = async ({ target: { name, value } }) => {
    console.log(value, "value form");
    console.log(name, "name form");

    let { data } = this.props.items;
    let filter;
    if (name == "indigridients") {
      filter = data.filter((el) => el.ingred.findIndex((e) => e.name == value) > -1);
    }
    if (name == "category") {
      filter = data.filter((el) => el.strCategory == value);
    }
    if (name == "rangeLeft") {
      filter = data.filter((el) => el.ingred.findIndex((e) => e.count >= value) > -1);
    }
    if (name == "rangeRight") {
      filter = data.filter((el) => el.ingred.findIndex((e) => e.count <= value) > -1);
    }

    this.props.changeFaset(filter);

  };

  changeSelect = (e) => {
    let {
      target: { value },
    } = e;

    console.log(this.props.items.data);

    let arr = this.props.items.data
      .reduce((acc, el, i) => {
        let filter = el.ingred
          .filter((e) => e.name == value)
          .map((e) => {
            let m = e.measure.match(/^[\d]+/);
            e.count = m && m.length ? +m[0] : 1;
            return e;
          });
        if (filter.length) {
          acc = [...acc, ...filter];
        }

        return acc;
      }, [])
      .sort((prev, next) => prev.count - next.count);

    console.log(arr, "arr");

    this.setState((state) => {
      let min = arr[0].count;
      let max = arr[arr.length - 1].count;
      min == max && (min = 0);
      min == max - 1 && (max += 2);

      let obj = {
        name: value,
        min,
        max,
      };
      console.log(obj, "obj");

      return {
        selectedIngredients: [...state.selectedIngredients, obj],
      };
    });
  };

  render() {
    console.log("render");
    console.log(this.props);

    return (
      <div className="faset__search">
        <form onChange={this.change}>
          
          <select
            name="indigridients"
            onChange={this.changeSelect}
            className="faset__search__select form__item"
          >
            {this.props.items.uniqIngre.map((el, i) => {
              return (
                <option value={el} key={i}>
                  {el}
                </option>
              );
            })}
          </select>
          
          <select
            name="category"
            onChange={this.changeCategorySelect}
            className="faset__search__select form__item"
          >
            {category.map((el, i) => {
              return (
                <option
                  className={`faset__search__select-option ${el}`}
                  value={el}
                  key={i}
                >
                  {el}
                </option>
              );
            })}
          </select>

          <div className="form__item">
            <ul className="tags__list">
              {this.state.selectedIngredients.map((el, i) => {
                return (
                  <li key={i}>
                    <div className="ingridient__name">{el.name}</div>
                    <InputRange min={el.min} max={el.max} />
                  </li>
                );
              })}
            </ul>
          </div>
        </form>
      </div>
    );
  }
}

export default SearchFacet;
