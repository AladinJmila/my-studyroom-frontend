import React, { useState, useLayoutEffect, useEffect } from 'react'
import usePrevious from './hooks/usePrevious'
import calculateBoundingBoxes from './services/calculateBoundingBoxes'

const AnimateReorder = ({ children }) => {
  const [boundingBox, setBoundingBox] = useState({})
  const [prevBoundingBox, setPrevBoundingBox] = useState({})
  const prevChildren = usePrevious(children)

  useLayoutEffect(() => {
    const newBoundingBox = calculateBoundingBoxes(children)
    setBoundingBox(newBoundingBox)
  }, [children])

  useLayoutEffect(() => {
    const prevBoundingBox = calculateBoundingBoxes(prevChildren)
    setPrevBoundingBox(prevBoundingBox)
  }, [prevChildren])

  useEffect(() => {
    const hasPrevBoundingBox = Object.keys(prevBoundingBox).length

    if (hasPrevBoundingBox) {
      React.Children.forEach(children, child => {
        const domNode = child.ref.current
        const firstBox = prevBoundingBox[child.key]
        const lastBox = boundingBox[child.key]
        const changeInY = firstBox?.top - lastBox?.top

        if (changeInY && changeInY !== NaN) {
          requestAnimationFrame(() => {
            // Before the DOM paints, invert child to old position
            domNode.style.transform = `translateY(${changeInY}px)`
            domNode.style.transition = 'transfrom 0s'

            requestAnimationFrame(() => {
              // After the previous frame, remove the transition to play the animation
              domNode.style.transform = ''
              domNode.style.transition = 'transform 1000ms'
            })
          })
        }
      })
    }
  }, [boundingBox, prevBoundingBox, children])

  return children
}

export default AnimateReorder
