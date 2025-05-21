'use client'
import React, { useRef, useState} from 'react';


const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

export default function ScrollDate() {
  const [selectedIndex, setSelectedIndex] = useState(2)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault()
    if (e.deltaY > 0) {
      // scroll hacia abajo
       setSelectedIndex((prev) => (prev + 1) % months.length) 
    } else {
      // scroll hacia arriba
      setSelectedIndex((prev) => (prev - 1 + months.length) % months.length)
    }
  }

  const visibleRange = 5

  return (
    <div
      ref={containerRef}
      onWheel={handleWheel}
      className="h-[200px] w-[65px] mx-auto flex flex-col items-center justify-center relative overflow-hidden bottom-[205px] left-[246px] "
    >
      {/* Líneas horizontales como en la imagen */}
      <div className="absolute top-1/2 w-full border-t border-gray-300" style={{ transform: 'translateY(-1.2rem)' }} />
      <div className="absolute top-1/2 w-full border-t border-gray-300" style={{ transform: 'translateY(0.9rem)' }} />

      <div className="flex flex-col items-center space-y-[-5px]">
        {/* {months.map((month, i) => {
          const offset = (i - selectedIndex + months.length) % months.length
          if (Math.abs(offset) > visibleRange) return null

          const baseStyle = ''
          const scale =
            offset === 2
              ? 'text-xl font-bold text-gray-900'
              : offset === -1 || offset === 1
              ? 'text-base text-gray-700'
              : offset === -2 || offset === 2
              ? 'text-xs text-gray-500'
              : 'text-xs text-gray-400'

          return (
            <div key={month} className={`${baseStyle} ${scale}`}>
              {month}
            </div>
          )
        })} */}
       {[...Array(visibleRange)].map((_, i) => {
          // offset va desde -2 hasta +2
          const offset = i - Math.floor(visibleRange / 2)
          const monthIndex = (selectedIndex + offset + months.length) % months.length
          const month = months[monthIndex]

          const baseStyle = 'transition-transform duration-300 ease-in-out'
          const scale =
            offset === 0
              ? 'text-sm font-bold text-gray-800'
              : Math.abs(offset) === 1
              ? 'text-sm text-gray-500'
              : 'text-xs text-gray-400'

          return (
            <div
              key={`${month}-${offset}`}
              className={`${baseStyle} ${scale}`}
              style={{
                transform: `translateY(${offset * 18}px)`,
                opacity: 1 - Math.abs(offset) * 0.2,
              }}
            >
              {month}
            </div>
          )
        })}
      </div>
    </div>
  )
}