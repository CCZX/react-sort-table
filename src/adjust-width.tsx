import React, { FC, useCallback } from 'react'

interface IAdjustWidthProps {
  width: strOrNum,
  onWidthChange: (width: number) => void
}

const AdjustWidth: FC<IAdjustWidthProps> = ({ width, onWidthChange }) => {
  let startX = 0

  const handleMouseMove = useCallback((e) => {
    const { clientX } = e
    const diffX = clientX - startX
    onWidthChange(Number(width) + diffX)
  }, [width, onWidthChange])

  const handleMouseLeave = useCallback(() => {
    document.removeEventListener('mousemove', handleMouseMove)
  }, [handleMouseMove])

  const handleMouseDown = useCallback((e) => {
    const { clientX } = e
    startX = clientX
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', () => {
      document.removeEventListener('mousemove', handleMouseMove)
    })
  }, [handleMouseMove, handleMouseLeave])

  return <span
    className="adjust-width-flag"
    onMouseDown={handleMouseDown}
  />
}

export default AdjustWidth
