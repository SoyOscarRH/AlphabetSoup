import React from "react";
import {HotKeys} from "react-hotkeys"
import AlphabetSoup from "./AlphabetSoup"



// |||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
// ||||||||||||            APP GENERAL          ||||||||||||||||||||||||
// |||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
export default class App extends React.Component {


    // =================================================
    // ========         CONSTRUCTOR              =======
    // =================================================
    constructor(props) {
        super(props)
        this.state = {
            WordsType: "Animales",
            EnableHints: true,
            TemporalBoardSize: 10,
            BoardSize: 10,
            Words: {
                Animales: [
                    "perro",
                    "gato",
                    "ave",
                    "pajaro",
                    "lobo",
                    "buho",
                    "ballenas",
                    "patos",
                    "gallina",
                    "cocodrilo",
                    "pez",
                    "zorro",
                    "raton",
                    "sapo",
                    "rana",
                    "gusano",
                    "leon",
                    "halcon",
                    "mosco",
                    "rata",
                ]
            }
        }

        super(props)

        document.addEventListener('DOMContentLoaded', function() {
            const Elements = document.querySelectorAll('.sidenav')
            const Sidenavs = M.Sidenav.init(Elements, {draggable: true, edge: "left"})
            
            const OptionsModals = {dismissible: true, inDuration: 40, outDuration: 40}
            M.Modal.init(document.getElementById('SubmissionModal'), OptionsModals)
        })
    }


    // =================================================
    // ========             RENDER           ===========
    // =================================================
    render () {


        return (
            <div>

                {/*+++++++++++++++++++++++++++++++++++++++++++++++++++++*/}
                {/*+++++++++           HEADERS              ++++++++++++*/}
                {/*+++++++++++++++++++++++++++++++++++++++++++++++++++++*/}
                <header>
                    
                    {/*=========================================================*/}
                    {/*================       NAV BAR        ===================*/}
                    {/*=========================================================*/}
                    <div className="navbar-fixed">
                        <nav className="indigo darken-2">
                            <div className="nav-wrapper container">
                                
                                {/*+++++++++++   NAME OF PAGE   ++++++++++++*/}
                                <div className="brand-logo white-text center" style={{fontSize: '1.5rem'}}>
                                    Sopa de Letras
                                </div>

                                {/*+++++++++++   LINK TO HOME   ++++++++++++*/}
                                <a href="/index.html" className="brand-logo right">
                                    <i className="material-icons white-text">home</i>
                                </a>

                                {/*+++++++++++      MENU       ++++++++++++++*/}
                                <a href="#" data-target="SideMenu" className="sidenav-trigger show-on-large">
                                    <i className="material-icons white-text">menu</i>
                                </a>

                            </div>
                        </nav>
                    </div>


                    {/*=========================================================*/}
                    {/*================      SIDE NAV        ===================*/}
                    {/*=========================================================*/}
                    <ul id="SideMenu" className="sidenav">
                        <li className="center">
                            <br />
                            <h5 style={{fontWeight: 300}}>
                                <b>Menú</b> de Opciones
                            </h5>
                            <br />
                        </li>
                        <li><a className="subheader">General</a></li>
                        <li>
                            <a className="waves-effect"
                                onClick={
                                    () => {
                                        this.setState(preState => {
                                            return {EnableHints: !preState.EnableHints}
                                        })
                                    }
                                }>
                                <i className="material-icons small">free_breakfast</i>
                                {this.state.EnableHints? "Desabilita": "Habilita"} Pistas
                            </a>
                        </li>
                        <li><br /></li>
                        <li><a className="subheader">Personalización</a></li>
                        <li>
                            <div className="row">
                                <div className="input-field col s6 offset-s1">
                                    <input 
                                        type      = "number"
                                        className = "validate"
                                        step      = "1"
                                        min       = "8"
                                        max       = "20"
                                        value     = {this.state.TemporalBoardSize}
                                        onChange  = {(e) => this.setState({TemporalBoardSize: e.target.value})}
                                    />
                                    <label htmlFor="first_name">Tamaño del Tablero</label>
                                </div>
                                <div className="col s2 vertical-align">
                                    <a 
                                        className = "waves-effect waves-light btn-floating green"
                                        onClick   = {() => {
                                            const Value = Number(this.state.TemporalBoardSize)

                                            if (Number.isInteger(Value) && Value > 7 && Value < 21)
                                                this.setState({BoardSize: Number(this.state.TemporalBoardSize)})
                                            else
                                                M.toast({html: "Error: Tamaño no válido"})
                                            }
                                        }
                                    >
                                        <i className="material-icons small">check</i>
                                    </a>
                                </div>
                            </div>
                        </li>
                    </ul>

                </header>

                {/*+++++++++++++++++++++++++++++++++++++++++++++++++++++*/}
                {/*+++++++++         SIMULATION             ++++++++++++*/}
                {/*+++++++++++++++++++++++++++++++++++++++++++++++++++++*/}
                <div className="center-align section">
                    <div className="container">
                        <div className="row">
                            <div className="s12">
                                <AlphabetSoup 
                                    WordsType      = {this.state.WordsType} 
                                    Words          = {this.state.Words[this.state.WordsType]}
                                    VerticalSize   = {this.state.BoardSize}
                                    HorizontalSize = {this.state.BoardSize}
                                    NumberOfTries  = {250}
                                    EnableHints    = {this.state.EnableHints}
                                />
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}



