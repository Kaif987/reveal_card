import { useState } from 'react'
import { unstable_renderSubtreeIntoContainer } from 'react-dom';
import './App.css'

function App() {
  const [grid ,setGrid] = useState(
    [
      [1, 0, 5, 0],
      [5, 2, 2, 4],
      [4, 3, 1, 3]
    ]
  )
  
  type previousSelectionState = {
    rowIndex: number | undefined;
    colmIndex: number | undefined;
  }

  const nullObject = {rowIndex: undefined, colmIndex: undefined}
  const [previousSelection, setPreviousSelection] = useState<previousSelectionState>(nullObject)

  const [revealedGrid, setRevealedGrid] = useState(
    new Array(grid.length).fill("").map(row => (new Array(4).fill(false)))
  )

  const handleClick = (rowIndex: number, colmIndex: number) =>{
    
    // when users clicks the card, update the grid

    if(revealedGrid[rowIndex][colmIndex] === true)return 
    const revealedGridCopy = [...revealedGrid]
    revealedGridCopy[rowIndex][colmIndex] = true
    setRevealedGrid(revealedGridCopy)
    


    // if the user selects for the first time, update the previous Selection state
    if(previousSelection.rowIndex == undefined || previousSelection.colmIndex == undefined){
      setPreviousSelection(prev => ({...prev, rowIndex: rowIndex, colmIndex: colmIndex}))
      return
    }

    // if previous selection does not match out current Selection, remove the previous and the current change
    // made on the grid after a delay of 1 second.
    if(grid[previousSelection.rowIndex][previousSelection.colmIndex] !== grid[rowIndex][colmIndex]){
      // if the card do not match, change the both the cards after delay of 1 second
      setTimeout(() => {
        const revealedGridCopy = [...revealedGrid]
        if(previousSelection.rowIndex === undefined || previousSelection.colmIndex === undefined) return 
        revealedGridCopy[previousSelection.rowIndex][previousSelection.colmIndex] = false
        revealedGridCopy[rowIndex][colmIndex] = false
        setRevealedGrid(revealedGridCopy)
        setPreviousSelection({rowIndex: undefined, colmIndex: undefined})
      }, (1000));
    }
    // if the grid matches, update the previous selection state to be none
    else{
      setPreviousSelection({rowIndex: undefined, colmIndex: undefined})
    }

  }

  

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
