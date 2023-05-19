import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { fetchTag } from "../../store/tags";



const TagShow = ({tagName}) =>{

    

    return (
        <>
            {/* <span className="TAGSHOW">HELLO HERE</span> */}
            <span>{tagName}</span>
        </>
    )
}

export default TagShow