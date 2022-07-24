import React, {useState} from "react"

interface SquareProps{
    value: string,
    onClick: any
}

const Square = (props: SquareProps)=>{

    return (
        <div>
            <button className="square" onClick={props.onClick}>
                {props.value}
            </button>
        </div>
    )
}

export default Square;