import React, { Component } from "react";

import TechItem from "./TechItem";

class TechList extends Component {
  state = {
    newTech: "",
    techs: []
  };

  // Executado assim que o componente aparece em tela. Ex.: um componente que busca dados de uma API externa é chamado aqui
  componentDidMount() {
    const techs = localStorage.getItem("techs");

    if (techs) {
      this.setState({ techs: JSON.parse(techs) });
    }
  }

  /**
   * Executado sempre que houver alterações nas propriedades (props) ou estado (state).
   * Ele recebe essas props e state antes de elas serem alteradas, como parâmetros: prevProps e prevState.
   * Ex.: quando há alteração nas props, é possível acessar essas novas props, que foram alteradas, através do 'this.props'.
   * Ex2.: quando há alteração no state, é possível acessar esse novo state que foi alterada, através do 'this.state'.
   */
  componentDidUpdate(_, prevState) {
    if (prevState.techs !== this.state.techs) {
      localStorage.setItem("techs", JSON.stringify(this.state.techs));
    }
  }

  /**
   * Executado quando o componente deixa de existir.
   * Quando um componente deixa de existir, usa-se esse método para que a aplicação volte para como ela estava antes do componente existir
   */
  componentWillUnmount() {}

  handleInputChange = e => {
    this.setState({ newTech: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();

    this.setState({
      techs: [...this.state.techs, this.state.newTech],
      newTech: ""
    });
  };

  handleDelete = tech => {
    this.setState({ techs: this.state.techs.filter(t => t !== tech) });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <ul>
          {this.state.techs.map(tech => (
            <TechItem
              key={tech}
              tech={tech}
              onDelete={() => this.handleDelete(tech)}
            />
          ))}
        </ul>
        <input
          type="text"
          onChange={this.handleInputChange}
          value={this.state.newTech}
        />
        <button type="submit">Enviar</button>
      </form>
    );
  }
}

export default TechList;
