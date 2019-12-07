import React, { Component } from 'react'

class Buscador extends Component {

    busquerdaRef = React.createRef();

    obtenerDatos = (e) => {
        e.preventDefault();

        // Tomamos el valor del input
        const termino = this.busquerdaRef.current.value;

        // Lo enviamos al componente principal
        this.props.datosBusquerda(termino);
        
    }

    render() {
        return (
            <form onSubmit={this.obtenerDatos}>
                <div className="row">
                    <div className="from-group col-md-8">
                        <input ref={this.busquerdaRef} type="text" className="form-control form-control-lg"
                            placeholder="Busca tu imageeen. Ejemplo: Futbol" />
                    </div>

                    <div className="from-group col-md-4">
                        <input type="submit" className="btn btn-lg btn-danger btn-block"
                            value="Buscar..." />
                    </div>
                </div>
            </form >
        );
    }
}

export default Buscador;