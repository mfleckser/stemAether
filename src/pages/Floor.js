import React from 'react'
import { useParams } from 'react-router-dom'
import Header from '../components/Header.js'

const Floor = () => {
    let { floorNum } = useParams();
    return (
        <div>
            <Header/>
            Floor: {floorNum}
        </div>
    )
}

export default Floor;