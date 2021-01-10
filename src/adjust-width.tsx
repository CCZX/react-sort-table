import React, { FC, useCallback } from 'react'
import { tableCellMinWidth } from './const'

interface IAdjustWidthProps {
  width: strOrNum,
  onWidthChange: (width: number) => void
}

const AdjustWidth: FC<IAdjustWidthProps> = ({ width, onWidthChange }) => {
  let startX = 0
  let nextWidth = 0
  const handleMouseMove = useCallback((e) => {
    e.preventDefault()
    const { clientX } = e
    const diffX = clientX - startX
    nextWidth = Number(width) + diffX
    nextWidth = nextWidth < tableCellMinWidth ? tableCellMinWidth : nextWidth
    // nextWidth = nextWidth > tableCellMaxWidth ? tableCellMaxWidth : nextWidth
    onWidthChange(nextWidth)
  }, [width, onWidthChange])

  const handleMouseLeave = useCallback(() => {
    document.removeEventListener('mousemove', handleMouseMove)
  }, [handleMouseMove])

  const handleMouseDown = useCallback((e) => {
    const { clientX } = e
    startX = clientX
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', () => {
      // onWidthChange(nextWidth)
      document.removeEventListener('mousemove', handleMouseMove)
    })
  }, [handleMouseMove, handleMouseLeave])

  return <span
    className="adjust-width-flag"
    onMouseDown={handleMouseDown}
  />
}

export default AdjustWidth
