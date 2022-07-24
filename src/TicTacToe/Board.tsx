import React, {useState, useEffect} from "react"
import Square from "./Square";
import ResetBoardButton from "./ResetBoardButton"

// history = [1,2,3]
// back button -> square value array = history.pop()

interface History{
    historyArray: Array<Array<string>>,
    historyTrackingIndex: number
}

const Board = () => {
    const initialSquareValues: Array<string> = Array(9).fill("")
    const initialHistory: History = {historyArray: [initialSquareValues], historyTrackingIndex: 0}
    const noWinner: string = ""

    const [squareValuesArray, setSquareValuesArray] = useState(initialSquareValues)
    const [history, setHistory] = useState(initialHistory)
    const [xIsNext, setXIsNext] = useState(true)
    const [winner, setWinner] = useState(noWinner)

    const renderSquare = (i : number) =>{        
        const squareValue = squareValuesArray[i]
        return <Square value={squareValue} onClick={()=>handleClick(i)}/>;
    }

    const renderResetButton = ()=>{
        return <ResetBoardButton onClick={()=>resetBoard()}/>
    }

    const renderStatus = ()=>{
        let status = "Next Player: " + (xIsNext ? "X" : "O")
        console.log(status)
        return status
    }

    const renderWinner = ()=>{
        const winnerStatus = `The Winner is... ${winner}`

        if(winner === noWinner){//Check if winner changed
            return noWinner
        }else{
            return winnerStatus
        }
    }

    const handleClick = (i: number)=>{
        if(winner){
            console.log("Game over!")
            setSquareValuesArray(initialSquareValues)
            setWinner(noWinner)
	    return
        }

        //Update squares and next player state
        console.log(i)
        const squareValuesArrayUpdated: Array<string> = squareValuesArray.slice()
        squareValuesArrayUpdated[i] = xIsNext ? "X": "O"
        setSquareValuesArray(squareValuesArrayUpdated)
        setXIsNext(!xIsNext)

        //Update history
        const historyArrayUpdated = history.historyArray.slice()
        historyArrayUpdated.push(squareValuesArrayUpdated)
        const historyIndexUpdated = historyArrayUpdated.length - 1
        const historyUpdated: History = {historyArray: historyArrayUpdated, historyTrackingIndex: historyIndexUpdated}
        setHistory(historyUpdated)

        //Check for winner
        calculateWinner(squareValuesArrayUpdated)  
    }

    const resetBoard: any = ()=>{
        console.log("Board was reset")
        setSquareValuesArray(initialSquareValues)
    }

    const renderBackHistory: any = ()=>{
        const backHistoryIndex = history.historyTrackingIndex - 1
        const backHistory = history.historyArray.slice()[backHistoryIndex]
        const historyUpdated: History = {historyArray: history.historyArray, historyTrackingIndex: backHistoryIndex}
        setSquareValuesArray(backHistory)
        setHistory(historyUpdated)
        setXIsNext(!xIsNext)
    }

    const renderFowardHistory: any = ()=>{
        const fowardHistoryIndex = history.historyTrackingIndex + 1
        const fowardHistory = history.historyArray.slice()[fowardHistoryIndex]
        const historyUpdated: History = {historyArray: history.historyArray, historyTrackingIndex: fowardHistoryIndex}
        setSquareValuesArray(fowardHistory)
        setHistory(historyUpdated)
        setXIsNext(!xIsNext)
    }

    const calculateWinner = (squareValuesArray: Array<string>) =>{
        const squareRows = [
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8]
        ]

        for(let i: number = 0; i<squareRows.length; i++){
            const matchArray = squareRows[i].map((squareIndex)=>{
                return squareValuesArray[squareIndex]
            })
            
            const {player, isWinner} = isMatchRow(matchArray)

            if (isWinner){
                console.log( `Player: ${player} | Winner: ${isWinner}`)
                setWinner(player)
                return
            }
        }
            
        return noWinner
    }

    const isMatchRow = (array: Array<string>) =>{
        const player: string = array[0]

        if(player == noWinner)
            return {player, isWinner:false}

        const isWinner = array.every(value => value == player)

        return {player, isWinner}
    }

    const updateResetBoardButton = () =>{

    }

    return(
        <div>
        <div>
            <div> {renderWinner()}</div>
            <br></br>
        </div>

        <span className="status">{renderStatus()} &nbsp;</span>
        <button className="history-button" onClick={renderBackHistory}> Back </button>
        <button className="history-button" onClick={renderFowardHistory}> Foward</button>

        <div className="board-row">
            {renderSquare(0)}
            {renderSquare(1)}
            {renderSquare(2)}
        </div>
        <div className="board-row">
            {renderSquare(3)}
            {renderSquare(4)}
            {renderSquare(5)}
        </div>
        <div className="board-row">
            {renderSquare(6)}
            {renderSquare(7)}
            {renderSquare(8)}
        </div>
            {renderResetButton()}
        </div>    
    )
}

export default Board;
