import React, { Component } from "react";
import Header from "./components/Header";
import FilterMain from "./components/FilterMain";
import "./index.scss";
import axios from "axios";

export default class App extends Component {
  state = {
    data: [],
    launchPads: [],
    launches: [],
    filters: {
      keywords: "",
      launchPad: "",
      minYear: 0,
      maxYear: 0
    },
    filteredResult: []
  };

  /*
    Collect data of Lauches and Launchpads from server and feed to launches[] and launchPads[] array
    Add headers: {'Access-Control-Allow-Origin': '*'} or {mode: "no-cors"} if you get CORS error.
  */
  componentDidMount = () => {
    axios.get("http://localhost:8001/launches").then(({ data }) => {
      //alert("launches: " + data);
      this.setState({ launches: data, filteredResult: data });
      //alert(this.state.launches.length);
    });

    axios.get("http://localhost:8001/launchpads").then(({ data }) => {
      this.setState({ launchPads: data });
      //alert("length" + this.state.launchpads.length);
    });
  };

  /*  
    When user clicks on downward arrow, window.scrollTo method takes to main filter section of the page.
  */
  goToTop(id) {
    const elem = document.getElementById(id);
    window.scrollTo(0, elem.offsetTop);
  }

  /*
    Once user sets all input filters it will be set in filters[] array
  */
  onFilterInputChange = input => {
    this.setState({
      filters: {
        ...this.state.filters,
        ...input
      }
    });
  };

  /*
    Produce result based on input filters set in filters[] array
  */
  getFilteredData = () => {
    const filteredResult = this.state.launches.filter(data => {
      const { keywords, launchPad, minYear, maxYear } = this.state.filters;
      const launchYear = new Date(data.launch_date_local).getFullYear();

      return (
        (!keywords ||
          (keywords &&
            !(
              data.flight_number.toString().indexOf(keywords) === -1 &&
              data.rocket.rocket_name
                .toLowerCase()
                .indexOf(keywords.toLowerCase()) === -1 &&
              !data.payloads.some(
                payload =>
                  payload.payload_id
                    .toLowerCase()
                    .indexOf(keywords.toLowerCase()) >= 0
              )
            ))) &&
        (!launchPad ||
          (launchPad &&
            !(
              data.launch_site.site_id.toLowerCase() !== launchPad.toLowerCase()
            ))) &&
        (!minYear || (minYear && !(launchYear < minYear))) &&
        (!maxYear || (maxYear && !(launchYear > maxYear)))
      );
    });

    this.setState({
      filteredResult
    });
  };

  render() {
    return (
      <div>
        <Header
          title="Space Savvy"
          banner="Discover Space Missions"
          handleClick={this.goToTop.bind(null, "main")}
        />
        <main id="main" role="main">
          <FilterMain
            launchPads={this.state.launchPads}
            launches={this.state.launches}
            onInputChange={this.onFilterInputChange}
            onFilter={this.getFilteredData}
            items={this.state.filteredResult} // Sending the filtered result to FilteredContent component
          />
        </main>
        <footer role="footercontent">
          <p>Copyright &copy; {new Date().getFullYear()} Space Savvy</p>
          <button
            className="back-to-top"
            onClick={this.goToTop.bind(null, "main")}
          >
            Back to Top
          </button>
        </footer>
      </div>
    );
  }
}
