import React, { FC, useRef, useCallback } from 'react'

interface IAdjustWidthProps {
  width: strOrNum,
  onWidthChange: (width: number) => void
}

const AdjustWidth: FC<IAdjustWidthProps> = ({ width, onWidthChange }) => {
  const domRef = useRef<HTMLSpanElement>(null)

  const handleMouseMove = useCallback((e) => {
    console.log('handleMouseMove')
    const { clientX } = e
    const diffX = clientX - startX
    onWidthChange(Number(width) + diffX)
  }, [width, onWidthChange])

  const handleMouseLeave = useCallback(() => {
    console.log('handleMouseLeave')
    domRef.current?.removeEventListener('mousemove', handleMouseMove)
    document.removeEventListener('mousemove', handleMouseMove)
  }, [handleMouseMove])

  let startX = 0
  const handleMouseDown = useCallback((e) => {
    console.log('handleMouseDown')
    const { clientX } = e
    startX = clientX
    // domRef.current?.addEventListener('mousemove', handleMouseMove)
    // domRef.current?.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', () => {
      document.removeEventListener('mousemove', handleMouseMove)
    })
  }, [handleMouseMove, handleMouseLeave])

  const handleMouseUp = useCallback(() => {
    console.log('handleMouseUp')
    domRef.current?.removeEventListener('mousemove', handleMouseMove)
    domRef.current?.removeEventListener('mouseleave', handleMouseLeave)
    document.removeEventListener('mousemove', handleMouseMove)
  }, [handleMouseMove, handleMouseLeave])

  return <span
    ref={domRef}
    className="adjust-width-flag"
    onMouseDown={handleMouseDown}
    // onMouseUp={handleMouseUp}
  />
}

export default AdjustWidth
