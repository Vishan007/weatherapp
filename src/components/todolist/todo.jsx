import React, { useState,useEffect } from 'react'
import "./style.css"

//get local storage data
const getLocalData = () => {
    const lists = localStorage.getItem('mytodo');
    if (lists) {
        return JSON.parse(lists);
    }else{
        return [];
    }
}

const Todo = () => {
    const [inputData,setInputData] = useState("");
    const [items ,setItems] = useState(getLocalData());
    const [isedititem ,setIsEditItem] = useState();
    const [togglebutton,setToggleButton] = useState(false)


    // add items functions
    const additem = () => {
        if (!inputData){
            alert('plz fill the data')
        }
        else if(inputData && togglebutton){
            setItems(
                items.map((curElem)=>{
                    if(curElem.id === isedititem){
                        return {...curElem,name:inputData}
                    }
                    return curElem;
                })
            );
            setIsEditItem([]);
            setInputData("");
            setToggleButton(false);
        }
        else{
            const myNewInputData = {
                id: new Date().getTime().toString(),
                name: inputData
            }
            setItems([...items,myNewInputData])
            setInputData('');
        }
    };
    //edit the items
    const editItem = (index) => {
        const item_to_edit = items.find((curElem)=>{
            return curElem.id === index;
        });
        setIsEditItem(index);
        setInputData(item_to_edit.name);
        setToggleButton(true);

    } 

    //delete the item in the list
    const deleteItem = (index) => {
        const updatedItems = items.filter((curElem) => {
            return curElem.id !== index
        });
        setItems(updatedItems)
    }
    //remove all items
    const removeallItems = () => {
        setItems([])
    }
    
    //storing data in local storage
    useEffect(() => {
        localStorage.setItem("mytodo",JSON.stringify(items))
    },[items])

    //enter key to add the item
    useEffect(() => {
        window.addEventListener('keydown',(event) => {
           if(event.keyCode===13){
                if (!inputData && items.length>0){
                    alert('plz fill the data')
                }
                else if(inputData && togglebutton){
                    setItems(
                        items.map((curElem)=>{
                            if(curElem.id === isedititem){
                                return {...curElem,name:inputData}
                            }
                            return curElem;
                        })
                    );
                    setIsEditItem([]);
                    setInputData("");
                    setToggleButton(false);
                }
                else{
                    const myNewInputData = {
                        id: new Date().getTime().toString(),
                        name: inputData
                    }
                    setItems([...items,myNewInputData])
                    setInputData('');
            }
           }
        })
    },[inputData])

  return (
    <>
        <div className='main-div'>
            <div className='child-div'>
                <figure>
                    <img src="./images/todo.png" alt="todologo" />
                    <figcaption>Add something to list</figcaption>
                </figure>
                <div className='addItems'>
                    <input value={inputData}  onChange={(event)=>{setInputData(event.target.value)}} type="text"  placeholder='📝 Add Item' className='form-control'/>
                    {togglebutton ? (<i className="far fa-edit add-btn"  onClick={()=>{additem()}}></i> ):
                    (<i className="fa fa-plus add-btn" onClick={()=>{additem()}}></i>)}
                </div>
                <div className='showItems'>
                    {
                        items.map((curElem)=> {
                            return(
                                <div className='eachItem' key={curElem.id}>
                                <h3>{curElem.name}</h3>
                                    <div className='todo-btn'>
                                        <i className='far fa-edit add-btn' onClick={() => {editItem(curElem.id)}}></i>
                                        <i className='far fa-trash-alt add-btn' onClick={()=>{deleteItem(curElem.id)}}></i>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                <div className='showItems'><button onClick={()=>{removeallItems()}} className='btn effect04' data-sm-link-text='Remove all'>
                    <span>Check List
                    </span></button>
                </div>
            </div>
        </div>
    </>
  )
}

export default Todo;