import React from "react"
import './Image.css'

function Image(){
    return(
    <div>
      <img src={require("./images/image1.jpg").default} alt='iamges' className='image'/>
    </div>
    )
}
export default Image