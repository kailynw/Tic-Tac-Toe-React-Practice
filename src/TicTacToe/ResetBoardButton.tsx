import React from 'react'

interface ResetBoardButtonProps{
    onClick: any
}

const ResetBoardButton = (props: ResetBoardButtonProps)=>{
    return(
        <div>
            <button id="reset-board-button" onClick={props.onClick}> Reset Board </button>
        </div>
    )
}

export default ResetBoardButton