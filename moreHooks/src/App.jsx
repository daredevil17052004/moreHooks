import { useState } from 'react'
import { useReducer } from 'react'
import './App.css'
import { useRef } from 'react'

let todo = [{
  task : 'Morning Walk',
  visibility : true
}]

function reducer(arr, action){
  switch (action.type) {
    case 'Add':
      return[...arr, {task: action.ta, visibility:true}]
      
    case 'Toggle':
      return arr.map((item,index)=>{
        if(action.index === index){
          return {...item , visibility : !item.visibility};
        }else{
          return item
        }
      })
  
    default:
      return arr;
      break;
  }
}

function App() {

  let [theArr, dispatch] = useReducer(reducer,todo);
  let [tempTask, setTempTask] = useState('')
  let refre = useRef(null)


  function handleChange(e){
    setTempTask(e.target.value);
  }

  function handleTask(){
    dispatch({type:'Add', ta : tempTask })
  }

  function handleToggle(index){
    dispatch({type:'Toggle', index})
  }

  function handleThis(){
    refre.current.focus();

  }

  return (
    <div className='cd'>
      <input type="text" onChange={(e) => handleChange(e)} ref ={refre} />
      <button onClick={handleTask}>Add Task</button>
      {
        theArr.map((item,index) =>{
          return(
            <div key={index}>
              {(item.visibility) ? item.task : "The content is hidden"}
              <button onClick={()=> handleToggle(index)}>Toggle</button>
              
              {(item.visibility) ? <button onClick={handleThis}>Get to Wriring</button> : null}
              
            
            </div>
          )
        })
      }  
    </div> 
  )
}

export default App
