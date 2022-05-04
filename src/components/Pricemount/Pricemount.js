import React,{useState, useEffect} from 'react'
import style from "./Price.module.css"

const Pricemount = ({current = ''}) => {
  const [activeKnop, setActiveKnop] = useState(0)
  const [sumCurrent, setSumCurrent] = useState("")

  let sumMount = () =>{
    let sum = current.replace(/[^\d]/g, '')
    if(activeKnop == 0){
      setSumCurrent(`${Math.round((sum/(3*30))*30)} ₸`)
    }
    if(activeKnop == 1){
      setSumCurrent(`${Math.round((sum/(6*30))*30)} ₸`)
    }
    if(activeKnop == 2){
      setSumCurrent(`${Math.round((sum/(12*30))*30)} ₸`)
    }
    if(activeKnop == 3){
      setSumCurrent(`${Math.round((sum/(24*30))*30)} ₸`)
    }
  }

  useEffect(()=>{
    sumMount()
  },[activeKnop])
  
  useEffect(()=>{
    sumMount()
  },[])

  return (
    <div className={style.blockRasrochka}>
      <div className={style.text}>
        <p>Рассрочка</p>
      </div>
      <div className={style.blockKnop}>
        <div className={style.sum}>
          <p>{sumCurrent}</p>
        </div>
        <select className={style.containerKnop} onChange={(e)=>setActiveKnop(e.target.value)}>
          <option value={0}>х 3 мес</option>
          <option value={1}>х 6 мес</option>
          <option value={2}>х 12 мес</option>
          <option value={3}>х 24 мес</option>
        </select>
      </div>  
    </div>
  )
}

export default Pricemount