// |||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
// ||||||||||||           SIMULATION PAGE       ||||||||||||||||||||||||
// |||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
import React from "react"
import {HotKeys} from "react-hotkeys"
import './OverFlowButHide.css'

// |||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
// ||||||||||||           SIMULATION PAGE       ||||||||||||||||||||||||
// |||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
export default class AlphabetSoup extends React.Component {

    // =================================================
    // ========        CONSTRUCTOR AND STATE     =======
    // =================================================
    constructor(props) {
        super(props)

        const HorizontalSize = this.props.HorizontalSize
        const VerticalSize = this.props.VerticalSize
        const NumberOfWords = this.props.Words.length

        // CREATE THE BOARD 
        let Board = Array(VerticalSize)
        for (let i = 0; i < VerticalSize; i++) {
            Board[i] = Array(HorizontalSize)
            for (let j = 0; j < HorizontalSize; j++) {
                Board[i][j] = {IsWord: false, WordNumber: [], WordIndex: [], Letter: '0', Pressed: false}
            }
        }

        let Words = this.props.Words.sort( (a, b) => b.length - a.length)
        let WordsInfo = []

        let WordIndex = 0
        let WordAddedIndex = 0
        let NumberOfTries = 0

        while (WordAddedIndex < NumberOfWords && NumberOfTries < this.props.NumberOfTries) {

            if (WordIndex >= NumberOfWords) WordIndex = 0
            if (WordsInfo.some(Element => Element.Word === Words[WordIndex])) {
                WordIndex += 1
                NumberOfTries += 1
                continue
            }

            const StartVerticalIndex   = Math.floor(Math.random() * this.props.VerticalSize)
            const StartHorizontalIndex = Math.floor(Math.random() * this.props.HorizontalSize)

            let Style = Math.floor(Math.random() * 3)

            for (let i = 0; i < 3; i++) {
                
                // Horizontal
                if (Style === 0) {
                    const Possible = Words[WordIndex].split('').every(function (element, index) {
                        if (index + StartHorizontalIndex >= HorizontalSize) 
                            return false 
                        else if (Board[StartVerticalIndex][StartHorizontalIndex + index].Letter !== Words[WordIndex].charAt(index) 
                            && Board[StartVerticalIndex][StartHorizontalIndex + index].Letter !== '0')
                            return false
                        else return true
                    })

                    if (Possible) {
                        Words[WordIndex].split('').forEach(function (element, index) {
                            Board[StartVerticalIndex][StartHorizontalIndex + index].Letter = element
                            Board[StartVerticalIndex][StartHorizontalIndex + index].IsWord = true
                            Board[StartVerticalIndex][StartHorizontalIndex + index].WordNumber.push(WordAddedIndex)
                            Board[StartVerticalIndex][StartHorizontalIndex + index].WordIndex.push(index)
                        })
                        WordsInfo.push({Word: Words[WordIndex], Found: Array(Words[WordIndex].length).fill(false)})
                        WordAddedIndex += 1
                        break
                    }
                }
                // Vertical
                else if (Style === 1) {
                    const Possible = Words[WordIndex].split('').every(function (element, index) {
                        if (index + StartVerticalIndex >= VerticalSize) 
                            return false 
                        else if (Board[StartVerticalIndex + index][StartHorizontalIndex].Letter !== Words[WordIndex].charAt(index) 
                            && Board[StartVerticalIndex + index][StartHorizontalIndex].Letter !== '0')
                            return false
                        else return true
                    })

                    if (Possible) {
                        Words[WordIndex].split('').forEach(function (element, index) {
                            Board[StartVerticalIndex + index][StartHorizontalIndex].Letter = element
                            Board[StartVerticalIndex + index][StartHorizontalIndex].IsWord = true
                            Board[StartVerticalIndex + index][StartHorizontalIndex].WordNumber.push(WordAddedIndex)
                            Board[StartVerticalIndex + index][StartHorizontalIndex].WordIndex.push(index)
                        })
                        WordsInfo.push({Word: Words[WordIndex], Found: Array(Words[WordIndex].length).fill(false)})
                        WordAddedIndex += 1
                        break
                    }
                }
                // Diagonal
                else {
                    const Possible = Words[WordIndex].split('').every(function (element, index) {
                        if (index + StartHorizontalIndex >= HorizontalSize) 
                            return false 
                        else if (Board[StartVerticalIndex + index][StartHorizontalIndex + index].Letter !== Words[WordIndex].charAt(index) 
                            && Board[StartVerticalIndex + index][StartHorizontalIndex + index].Letter !== '0')
                            return false
                        else if (Board[StartVerticalIndex + index][StartHorizontalIndex + index].Letter !== Words[WordIndex].charAt(index))
                            return false
                        else return true
                    })

                    if (Possible) {
                        Words[WordIndex].split('').forEach(function (element, index) {
                            Board[StartVerticalIndex + index][StartHorizontalIndex + index].Letter = element
                            Board[StartVerticalIndex + index][StartHorizontalIndex + index].IsWord = true
                            Board[StartVerticalIndex + index][StartHorizontalIndex + index].WordNumber.push(WordAddedIndex)
                            Board[StartVerticalIndex + index][StartHorizontalIndex + index].WordIndex.push(index)
                        })
                        WordsInfo.push({Word: Words[WordIndex], Found: Array(Words[WordIndex].length).fill(false)})
                        WordAddedIndex += 1
                        break;
                    }
                }

                Style = (Style + 1) % 3
            }

            WordIndex += 1
            NumberOfTries += 1

        }

        const Alphabet = 'abcdefghijklmnopqrstuvwxyz'.toUpperCase().split('')

        for (let i = 0; i < VerticalSize; i++) {
            for (let j = 0; j < HorizontalSize; j++) {
                if (Board[i][j].Letter === '0') {
                    Board[i][j].Letter = Alphabet[Math.floor(Math.random() * Alphabet.length)]
                }
            }
        }


        this.state = {
            Board: Board,
            WordsInfo: WordsInfo,
        }
    }




    // =========================================================
    // ============           RENDER              ==============
    // =========================================================
    render () {

        const Press = (i, j, Element) => {
            console.log(`Me pasaron i ${i}, j ${j}`)
            const NewBoard = [...this.state.Board]
            NewBoard[i][j].Pressed = !NewBoard[i][j].Pressed

            const NewWordsInfo = [...this.state.WordsInfo]
            if (Element.IsWord) {

                let CompleteWord = false
                let CompleteWordIndex = 0
                Element.WordNumber.forEach( (actualNumber, index) => {
                    NewWordsInfo[actualNumber].Found[Element.WordIndex[index]] = !NewWordsInfo[actualNumber].Found[Element.WordIndex[index]]
                    
                    if (NewWordsInfo[actualNumber].Found.every(element => element)) {
                        CompleteWord = true
                        CompleteWordIndex = actualNumber 
                    }
                })

                if (CompleteWord)
                    M.toast({html: `Nueva palabra encontrada: ${this.state.WordsInfo[CompleteWordIndex].Word.toUpperCase()}`})
            }

            this.setState({Board: NewBoard, WordsInfo: NewWordsInfo})
        }

        const BoardRepresentation = this.state.Board.map( (Row, i) => {

            const RowRepresentation = Row.map ( (Element, j) => {

                let CompleteWord = false
                if (Element.IsWord) {

                    CompleteWord = false
                    Element.WordNumber.forEach( (actualNumber, index) => {
                        if (this.state.WordsInfo[actualNumber].Found.every(element => element))
                            CompleteWord = true
                    })
                }

                return (
                    <td key={`i=${i} j=${j}`}>
                        <Letter 
                            Element = {Element.Letter} 
                            Hint    = {Element.IsWord? (Element.WordNumber.length > 1? "Multi" :"Normal"): "None"} 
                            Type    = {CompleteWord? "Complete": (Element.Pressed? "Pressed": "Normal")} 
                            onClick = {() => Press(i, j, Element)}
                        />
                    </td>
                )
            })

            return (
                <tr style={{border: 'none'}} key={`i=${i}`}>
                    {RowRepresentation}
                </tr>
            )

        })

        return (
            <div>    
                {/*=====================================================*/}
                {/*=========    SELECTOR FOR NEW PRODUCT    ============*/}
                {/*=====================================================*/}
                <div className="card-panel grey lighten-5">
                    <h4 className="center-align blue-grey-text text-darken-2">
                        <strong>{this.props.WordsType}</strong>: Sopa de Letras 
                    </h4>
                    <br />

                    <div className="row" id="CardInfo" style={{'overflowX': 'scroll'}}>
                        <div className="col s10 offset-s1 blue-grey-text darken-2-text">

                            Las siguientes palabras estas:
                            <ul>
                                {this.state.WordsInfo.map(Element => <li key={Element.Word}>{Element.Word}</li>)}
                            </ul>

                        </div>
                    </div>

                    <br />
                    <br />

                </div>

                {/*=====================================================*/}
                {/*=========        TABLE FOR A CARD        ============*/}
                {/*=====================================================*/}
                <div className="card-panel z-depth-2">
                    <h4 className="center-align blue-grey-text text-darken-2">
                        <strong>Tablero</strong>
                    </h4>
                    <div id="CardTable" style={{'overflowX': 'scroll'}}>
                        <table className="browser-default">
                            <tbody>
                                {BoardRepresentation}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    }
}




function Letter (props) {

    if (props.Type === "Complete") console.log("Wii")
    let Intensity = 1

    if      (props.Hint === "Multi")  Intensity = 0
    else if (props.Hint === "Normal") Intensity = 2
    else if (props.Hint === "None")   Intensity = 3

    let Color = "light-blue"
    if      (props.Type === "Normal")   Color = "blue"
    else if (props.Type === "Pressed")  Color = "purple", Intensity = 2
    else if (props.Type === "Complete") Color = "light-green"

    return (
        <a 
            className={`${Color} lighten-${Intensity} waves-effect waves-light btn`}
            onClick = {props.onClick}
        >
            {props.Element}
        </a>
    )
}
