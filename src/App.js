import React, { Component } from 'react';
import Buscador from './components/Buscador';
import Resultado from './components/Resultado';
import axios from 'axios';

class App extends Component {

  state = {
    termino: '',
    imagenes: [],
    pagina: ''
  }

  scroll = () => {
    const elemento = document.querySelector('.jumbotron');
    elemento.scrollIntoView('smoot', 'start');
  }

  paginaAnterior = () => {
    // Leer el state de la pagin acutal
    let pagina = this.state.pagina;

    //Leer si la pagina es 1 no ir mas atras
    if (pagina === 1) return null;

    //Restar 1 a la pagina acutal
    pagina -= 1;

    //Agregar el cambio al state
    this.setState({
      pagina
    }, () => {
      this.consultarApi();
      this.scroll();
    });
  }

  paginaSiguiente = () => {
    // Leer el state de la pagin acutal
    let pagina = this.state.pagina;

    //Sumar 1 a la pagina acutal
    pagina += 1;

    //Agregar el cambio al state
    this.setState({
      pagina
    }, () => {
      this.consultarApi();
      this.scroll();
    });

  }

  consultarApi = () => {
    const termino = this.state.termino;
    const pagina = this.state.pagina;
    const url = `https://pixabay.com/api/?key=14517952-b37aa7ad39b401663881c7ef0&q=${termino}&per_page=30&page=${pagina}`;

    // console.log(url);
    // fetch(url)
    //   .then(respuesta => respuesta.json())
    //   .then(resultado => this.setState({ imagenes: resultado.hits }));
    axios.get(url)
      .then(res => {
        const busqueda = res.data.hits;
        this.setState({ imagenes: busqueda });
      })

  }

  datosBusquerdas = (termino) => {
    this.setState({
      // para cambiar el valor del statado.termino como la clave es termino y recivira el varlor termino se pone solo termino para no poner termino: termino
      termino: termino,
      pagina: 1
    }, () => {
      this.consultarApi();
    })
  }
  render() {
    return (
      <div className="App container mt-3">
        <div className="jumbotron">

          <p className="lead text-center">Buscador de Imagenes</p>

          <Buscador
            datosBusquerda={this.datosBusquerdas}
          />

        </div>

        <div className="row justify-content-center">
          <Resultado
            imagenes={this.state.imagenes}
            paginaAnterior={this.paginaAnterior}
            paginaSiguiente={this.paginaSiguiente}
          />
        </div>
      </div>
    );
  }
}

export default App;
