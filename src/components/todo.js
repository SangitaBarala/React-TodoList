import React, {useState, useEffect} from 'react';
import './style.css'

const getLocalData = () => {
    const lists = localStorage.getItem("MyTododList")
    if(lists){
        return JSON.parse(lists)
    }else{
        return []
    }

}

const Todo = () => {
    const [inputData, setInputData] = useState("")
    const [items, setItems] = useState(getLocalData())
    const [isEditedItem, setIsEditedItem] = useState("")
    const [toggle, setToggle] = useState(false)
    const addItems = () => {
        if(!inputData){
            alert("please enter some data to add..")
        }else if(inputData && toggle){
            setItems(
                items.map((curElem)=>{
                    if(curElem.id === isEditedItem){
                        return {...curElem, name: inputData}
                    }
                    return curElem
                })
            )
            setInputData([])
            setIsEditedItem(null)
            setToggle(false)
        }
        else{
            const myNewData = {
                id: new Date().getTime().toString(),
                name: inputData
            }
            setItems([...items, myNewData])
            setInputData("")
        }
    }
    const editItem = (index) => {
        const editedItem = items.find((curElem)=>{
            return curElem.id === index
        })
        setInputData(editedItem.name)
        setIsEditedItem(index)
        setToggle(true)
    }
    const deleteItem = (index) => {
        const updatedItemList = items.filter((curElem)=>{
            return curElem.id !== index
        })
        setItems(updatedItemList)
    }
    const RemoveAll = () => {
        setItems([])
    }

    useEffect(()=>{
        localStorage.setItem("MyTodoList", JSON.stringify(items))
    },[items])

    return (
        <>
           <div className="main-div">
               <div className="child-div">
                   <figure>
                       <img src="todoImg.jpg" alt="todoLogo"/>
                       <figcaption>Add Your task Here ✌</figcaption>
                   </figure>
                   <div className="addItems">
                       <input type="text" placeholder="✍ Add task.." className="form-control"
                        value={inputData}
                        onChange={(event)=>setInputData(event.target.value)}/>
                       {toggle ? (<i className="fas fa-edit" onClick={addItems}></i>)
                           :  (<i className="fa fa-plus-square" onClick={addItems}></i>)
                       }
                   </div>
                   <div className="showItems">
                       {items.map((curElem)=>{
                           return(
                               <div className="eachItem">
                                   <h3>{curElem.name}</h3>
                                   <div className="todo-btn">
                                       <i className="fas fa-edit" onClick={()=> editItem(curElem.id)}></i>
                                       <i className="far fa-trash-alt" onClick={()=>deleteItem(curElem.id)}></i>
                                   </div>
                               </div>
                           )
                           }
                       )}
                   </div>
                   <div className='showItems'>
                       <button className="btn effect04" data-sm-link-text='Remove All'
                       onClick={RemoveAll}>
                           <span>CHECK LIST</span>
                       </button>
                   </div>
               </div>

           </div>
        </>
    );
};

export default Todo;