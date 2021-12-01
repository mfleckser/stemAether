import React, { useRef, useState } from 'react'
import { useEffect } from 'react'
import { checkoutRoom } from "../data.js"


// Rooms data
const rooms = {
    'G': [
        {
            name: 'polygon',
            params: {
                'roomNumber': 2,
                'coordies': [[200,100], [230, 100], [350, 150], [350, 200], [200, 200]],
                'color': '#FFFFFF',
                'hoverColor': '#000000'

            },
            range: [200, 100, 350, 200]
        },
        {
            
            name: 'rectangle', 
            params: {
                'roomNumber':0,
                'coordies': [100, 100, 100, 100],
                'color': '#FFFFFF',
                'hoverColor': '#000000'
            },
            range: [100, 100, 200, 200]
        }
    ],
    '1': [],
    '2': []
    
}

// const setRoom = () => {
//     checkoutRoom(rooms.params["roomNumber"]);
//     alert("Test");
//   }

const Canvas = props => {
    const floor = props.floor
    const canvasRef = useRef(null) 
    const [hoveredRoom, setHoveredRoom] = useState(null)
    const [clickedRoom, setClickedRoom] = useState(null)
    const [occupiedRoom, setOccupiedRoom] = useState(null)

    useEffect(() => {
        const canvas = canvasRef.current
        const context = canvas.getContext('2d')

        context.canvas.width = window.innerWidth - .1*window.innerWidth
        context.canvas.height = window.innerHeight - .1*window.innerHeight

        const shapeFunctions = {
            'rectangle': (params, range, isHovered, isClicked) => {
                const color = params['color']
                const hoverColor = params['hoverColor']
                
                if (isClicked) {
                    context.beginPath()
                    const coordies = params['coordies']
                    const coord1 = coordies[0] - 10
                    const coord2 = coordies[1] - 10
                    const coord3 = coordies[2] + 20
                    const coord4 = coordies[3] + 20
                    context.rect(coord1, coord2, coord3, coord4)
                    context.stroke()
                } else {
                    context.beginPath()
                    context.rect(...params['coordies'])
                    context.stroke();
                }
                
                context.fillStyle = isHovered ? hoverColor : color
                context.fill()

                context.fillText(params['roomNumber'], 10,10)
                //(range[0] + (range[2]-range[0])/2) - 5, (range[1] + (range[3]-range[1])/2) - 3)

            },
            'polygon': (params, range, isHovered, isClicked) => {
                context.beginPath()
                const coordies = params['coordies']
                if (isClicked) {
                    let maxX = 0
                    let minX = 100000
                    let maxY = 0
                    let minY = 100000
                    for (let i=0; i<coordies.length; i++) {
                        const x = coordies[i][0]
                        const y = coordies[i][1]
                        if (x>maxX) {
                            maxX = x
                        } else if (x<minX) {
                            minX = x
                        }
                        if (y>maxY) {
                            maxY = y
                        } else if (y<minY) {
                            minY = y
                        }
                    }
                    const centerX = (maxX-minX)/2 + minX
                    const centerY = (maxY-minY)/2 + minY 
                    console.log(centerX)

                    let newCoordies = []

                    for (let i=0; i<coordies.length; i++) {
                        const x = coordies[i][0]
                        const y = coordies[i][1]
                        let newX = 0
                        let newY = 0
                        if (x<centerX) {
                            newX = x-10
                        } else {
                            newX = x+10
                        }

                        if (y<centerY) {
                            newY = y-10
                        } else {
                            newY = y+10
                        }

                         newCoordies.push([newX, newY])
                    }
                    context.moveTo(...newCoordies[0])
                    newCoordies.forEach((coord) => {
                        context.lineTo(...coord)
                    })
                    context.closePath()
                    context.stroke();
                    
                } else {
                    context.moveTo(...coordies[0])
                    coordies.forEach((coord) => {
                        context.lineTo(...coord)
                    })
                    context.closePath()
                    context.stroke();
                }

                const color = params['color']
                const hoverColor = params['hoverColor']
                context.fillStyle = isHovered ? hoverColor : color
                context.fill()
                
            }
        }
        context.lineWidth = 1
        context.fillStyle = '#000000'
        const shapes = rooms[floor]
        let clickedShape = null
        let isHovered = null
        let isClicked = null
        for (let i=0; i<shapes.length; i++) {
            const name = shapes[i].name
            const params = shapes[i].params
            const range = shapes[i].range
            isHovered = hoveredRoom != null && hoveredRoom.roomNumber == shapes[i].roomNumber
            isClicked = clickedRoom != null && clickedRoom.roomNumber == shapes[i].roomNumber
            

            if (isClicked) {
                clickedShape = shapes[i]
                console.log(clickedShape)
            } else {
                shapeFunctions[name](params, range, isHovered, isClicked)
            }

        }
        
        if (clickedShape) {
            isHovered = hoveredRoom != null && hoveredRoom.roomNumber == clickedShape.roomNumber
            isClicked = clickedRoom != null && clickedRoom.roomNumber == clickedShape.roomNumber
            shapeFunctions[clickedShape.name](clickedShape.params, clickedShape.range, isHovered, isClicked)
        }

    }, [hoveredRoom, clickedRoom, occupiedRoom])

    const handleMouseMove = e => {
        const pos = [e.clientX - e.target.offsetLeft, e.clientY - e.target.offsetTop]
        const shapes = rooms[floor]
        let found = false
        for (let i=0; i<shapes.length; i++) {
            const shape = shapes[i]
            const range = shape.range
            if (pos[0] < range[2] && pos[0] > range[0] && pos[1] > range[1] && pos[1] < range[3]) {
                setHoveredRoom(shape)
                found = true
                break
            }
        }
        if(!found) {
            setHoveredRoom(null)
        }
    }
    
    const handleClick = e => {
        // setRoom()
        setClickedRoom(null)
        setClickedRoom(hoveredRoom)
    }

    const occupyRoom = e => {
        if (clickedRoom) {
            clickedRoom.params.color = '#000000'
            setOccupiedRoom(clickedRoom)
            // checkoutRoom(0);
            console.log("function called")
        }
    }

    const leaveRoom = e => {
        if (occupiedRoom != null && clickedRoom.name == occupiedRoom.name) {
            clickedRoom.params.color = '#FFFFFF'
            setOccupiedRoom(null)
        }
    }

    return ( 
        <div>
            <canvas onClick={handleClick} onMouseMove={handleMouseMove} ref={canvasRef} {...props}/>
           
        
            <div> 
                <button onClick={occupyRoom}>let me in the room</button>
                <button onClick={leaveRoom}>get me out</button>
                <p>whos here</p>
            </div>

        </div>
        

        );
}
export default Canvas