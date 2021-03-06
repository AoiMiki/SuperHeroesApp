import React from "react";
import "./styles.css";
import Card from "./Card";
import Spinner from "./Spinner";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchName: "",
      heroes: [],
      loading: false
    };

    this.handleSearchNameChange = this.handleSearchNameChange.bind(this);
  }

  handleSearchNameChange(event) {
    this.setState({ searchName: event.target.value }, () =>
      this.searchSuperHeroByName(this.state.searchName)
    );
  }

  searchSuperHeroByName(name) {
    this.setState({ loading: true });
    fetch(
      "https://www.superheroapi.com/api.php/10223219161005212/search/" + name
    )
      .then(response => response.json())
      .then(data => {
        if (data.response === "success") {
          this.setState({ heroes: data.results });
        } else {
          this.setState({ heroes: [] });
        }
        this.setState({ loading: false });
      });
  }

  render() {
    return (
      <div className="App bg-secondary">
        <div className="bg-light pt-5 pb-3">
          <h1 className="pb-5 text-info">Super Heroes App</h1>
          <div className="container">
            <div className="input-group mb-4">
              <input
                type="text"
                placeholder="Ingresar nombre super heroe"
                className="form-control"
                value={this.state.searchName}
                onChange={this.handleSearchNameChange}
              />
            </div>
          </div>
        </div>
        <div className="container d-flex flex-wrap justify-content-center pt-5">
          {this.state.loading && <Spinner />}
          {this.state.heroes.map(heroe => {
            return (
              <Card
                key={heroe.id}
                name={heroe.name}
                imageUrl={heroe.image.url}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

export default App;
