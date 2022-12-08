import { useState } from 'react'
import './App.css'

function App() {
  const [grid ,setGrid] = useState(
    [
      [1, 0, 5, 0],
      [5, 2, 2, 4],
      [4, 3, 1, 3]
    ]
  )

  const [revealedGrid, setRevealedGrid] = useState(
    new Array(grid.length).fill("").map(row => (new Array(4).fill(false)))
  )

  const handleClick = (rowIndex: number, colmIndex: number) =>{
    // if user clicks for the first time only reveal the card
    const newRevealedGrid = [...revealedGrid]
    newRevealedGrid[rowIndex][colmIndex] = true
    setRevealedGrid(newRevealedGrid)
    
  }

  // check if the user has clicked 
  // if the first card number matches the second card number : do not change the grid
  // if the card do not match, change the both the cards after delay of 1 second
  

  return (
    <div className="App">
      <div className='grid'>
        {grid.map((row, rowIndex) =>{
          return (
            <div className='row flex' key={rowIndex} >
              {row.map((colm, colmIndex) =>{
                return (
                  <div key = {colmIndex} className='card' onClick={() => {handleClick(rowIndex, colmIndex)}}>
                    {revealedGrid[rowIndex][colmIndex] ? grid[rowIndex][colmIndex] : " "}
                  </div>
                )
              })}
          </div>
          )
        })}
      </div>
    </div>
  )
}

export default App
