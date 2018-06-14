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
                                onClick={(e) => M.Modal.getInstance(document.getElementById('SubmissionModal')).open()}>
                                <i className="material-icons small">create</i>
                                Cambiar Cadenas
                            </a>
                        </li>
                        <li>
                            <a className="waves-effect"
                                onClick={(e) => M.Modal.getInstance(document.getElementById('TutorialModal')).open()}>
                                <i className="material-icons">info</i>
                                Tutorial de Uso
                            </a>
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
                                    VerticalSize   = {12}
                                    HorizontalSize = {12}
                                    NumberOfTries  = {250}
                                />
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}



