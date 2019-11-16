import React from "react";

class FilterComponents extends React.Component {
  constructor() {
    super();
    this.state = {
      keywords: "",
      launchPad: "",
      minYear: 0,
      maxYear: 0,
      isFilterDisabled: false
    };
  }

  /*
  Validation for min and max year
*/
  handleInputChange = e => {
    const input = {};
    const { name, value } = e.target;

    input[name] = value;

    this.setState(
      {
        ...input
      },
      () => {
        if (
          (name === "minYear" &&
            this.state.maxYear !== 0 &&
            parseInt(this.state.maxYear, 10) < parseInt(value, 10)) ||
          (name === "maxYear" &&
            this.state.minYear !== 0 &&
            parseInt(this.state.minYear, 10) > parseInt(value, 10))
        ) {
          this.setState(
            {
              isFilterDisabled: true
            },
            () => alert("Please enter a valid year range.")
          );
        } else {
          this.setState({
            isFilterDisabled: false
          });
        }
      }
    );

    this.props.onInputChange(input);
  };

  /*
    Retrieve Lauch Pad name based on id
  */
  handleInputLaunchPad = () => {
    return this.props.launchPads.map((launchPad, i) => (
      <option value={launchPad.id} key={i}>
        {launchPad.full_name}
      </option>
    ));
  };

  /*
    Sort filtered result based on min and max year
  */
  handleInputYear = () => {
    const years = this.props.launches.reduce((arr, launch) => {
      const year = new Date(launch.launch_date_local).getFullYear();

      if (arr.indexOf(year) === -1) {
        arr.push(year);
      }

      return arr;
    }, []);

    return years.sort().map((year, i) => (
      <option key={i} value={year}>
        {year}
      </option>
    ));
  };

  render() {
    return (
      <ul className="filters-panel">
        <li>
          <label htmlFor="filter-keywords">Keywords</label>
          <input
            id="filter-keywords"
            name="keywords"
            type="text"
            placeholder="e.g. Falcon"
            onChange={this.handleInputChange}
          />
        </li>
        <li>
          <label htmlFor="filter-launch-pad">Launch Pad</label>
          <select
            id="filter-launch-pad"
            name="launchPad"
            onChange={this.handleInputChange}
          >
            <option value="">Any</option>
            {this.handleInputLaunchPad()}
          </select>
        </li>
        <li>
          <label htmlFor="filter-min-year">Min Year</label>
          <select
            id="filter-min-year"
            name="minYear"
            onChange={this.handleInputChange}
          >
            <option value="">Any</option>
            {this.handleInputYear()}
          </select>
        </li>
        <li>
          <label htmlFor="filter-max-year">Max Year</label>
          <select
            id="filter-max-year"
            name="maxYear"
            onChange={this.handleInputChange}
          >
            <option value="">Any</option>
            {this.handleInputYear()}
          </select>
        </li>
        <li>
          <button
            disabled={this.state.isFilterDisabled}
            onClick={this.props.onFilter}
          >
            Apply
          </button>
        </li>
      </ul>
    );
  }
}

export default FilterComponents;
