import React,{useState,useEffect} from 'react'
import "./style.css";

const UseEffect = () => {
    const [myNum,setMyNum] = useState(0);

    useEffect(() => {
        document.title = `Msg(${myNum})`;
    });
    return(
        <>
            <div className="center_div">
                <p>{myNum}</p>
                <div class="button2" onClick={() => setMyNum(myNum + 1)}>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    Add
                </div>
            </div>    
        </>
    )
}

export default UseEffect;