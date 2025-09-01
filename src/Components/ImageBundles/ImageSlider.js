import React, { useState } from "react"

const ImageStack = ({ images, customWidth }) => {
  const [topIndex, setTopIndex] = useState(0)
  const [hoveredIndex, setHoveredIndex] = useState(null)

  const getDisplayOrder = () => {
    // Put the clicked/top image first in array for stacking
    const before = images.slice(0, topIndex)
    const after = images.slice(topIndex + 1)
    return [images[topIndex], ...after, ...before]
  }

  const displayOrder = getDisplayOrder()

  return (
    <div
      style={{
        width: `${customWidth?.width}`,
        marginTop: `${customWidth?.marginTop}`,
        height: `${customWidth?.height}`,
      }}
      className="relative stack-images  mx-auto "
    >
      {displayOrder.map((image, idx) => {
        const isHovered = hoveredIndex === idx
        const isTop = idx === 0

        // Enhanced scaling and positioning with hover effects
        const scale = isTop ? 1 : 1 - idx * 0.1
        // const scale = isTop ? 1 : 0.94 - idx * 0.05
        const hoverScale = isHovered && !isTop ? scale + 0.02 : scale
        const xOffset = idx * 5
        const yOffset = idx * 27
        // const zIndex = displayOrder.length - idx + (isHovered ? 1 : 0)
        const zIndex = displayOrder.length - idx
        const rotation = idx * 1.5
        const hoverRotation = isHovered && !isTop ? rotation - 0.5 : rotation

        return (
          <div
            key={image.src}
            className={`absolute cursor-pointer transition-all duration-500 ease-out rounded-xl overflow-hidden
              ${
                isTop
                  ? "shadow-2xl border-2 border-white/50 backdrop-blur-sm"
                  : "shadow-lg border border-gray-200/60 hover:shadow-2xl hover:border-white/30"
              }
            `}
            style={{
              width: "100%",
              height: "100%",
              transform: `
                translate3d(${xOffset}px, -${yOffset}px, ${isTop ? 0 : -idx * 2}px)
                scale(${hoverScale})
                rotateY(${hoverRotation}deg)
                rotateX(${idx * 0.8}deg)
              `,
              transformOrigin: "center top",
              zIndex,
              opacity: isTop ? 1 : isHovered ? 0.95 : 0.87,
              filter: isTop ? "none" : `brightness(${0.9 - idx * 0.05}) contrast(${1 + idx * 0.1})`,
              transformStyle: "preserve-3d",
              willChange: "transform, opacity, filter",
            }}
            onMouseEnter={() => setHoveredIndex(idx)}
            onMouseLeave={() => setHoveredIndex(null)}
            onClick={() => {
              const originalIndex = images.findIndex((img) => img.src === image.src)
              setTopIndex(originalIndex)
            }}
          >
            {/* Enhanced macOS window bar */}
            <div
              className={`absolute top-0 left-0 right-0 h-10 bg-gradient-to-b  from-gray-100 to-gray-200
              border !border-white flex items-center px-4 z-10 backdrop-blur-sm
              ${isTop ? "bg-opacity-100" : "bg-opacity-100"}
            `}
            >
              {/* <div className="flex space-x-2">
                <div
                  className={`w-3 h-3 rounded-full transition-all duration-200
                  ${isTop ? "bg-red-500 shadow-sm" : "bg-red-400/70"}
                `}
                ></div>
                <div
                  className={`w-3 h-3 rounded-full transition-all duration-200
                  ${isTop ? "bg-yellow-500 shadow-sm" : "bg-yellow-400/70"}
                `}
                ></div>
                <div
                  className={`w-3 h-3 rounded-full transition-all duration-200
                  ${isTop ? "bg-green-500 shadow-sm" : "bg-green-400/70"}
                `}
                ></div>
              </div> */}
              <div className="flex-1 text-center">
                <span
                  className={`text-sm font-medium transition-all duration-200
                  ${isTop ? "text-gray-700" : "text-gray-600/80"}
                `}
                >
                  {image.title || image.alt}
                </span>
              </div>
              {/* Window controls hint */}
              {/* <div className="w-16"> {image.title || image.alt}</div> */}
            </div>

            {/* Image with enhanced effects */}
            <div className="relative w-full h-full pt-10 overflow-hidden">
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-fit-fill transition-all duration-500"
                style={{
                  transform: isHovered && !isTop ? "scale(1.02)" : "scale(1)",
                }}
              />

              {/* Enhanced overlay for background windows */}
              {!isTop && (
                <div
                  className="absolute inset-0 transition-all duration-300"
                  style={{
                    background: `linear-gradient(135deg, 
                      rgba(255,255,255,${isHovered ? 0.03 : 0.08}), 
                      rgba(0,0,0,${isHovered ? 0.02 : 0.05})
                    )`,
                  }}
                />
              )}

              {/* Depth indicator */}
              {!isTop && (
                <div className="absolute bottom-2 right-2 w-2 h-2 rounded-full bg-white/20 backdrop-blur-sm"></div>
              )}
            </div>

            {/* Reflection effect for top image */}
            {isTop && (
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent pointer-events-none rounded-xl"></div>
            )}
          </div>
        )
      })}

      {/* Stack indicator */}
      {/* <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, idx) => (
          <div
            key={idx}
            className={`w-2 h-2 rounded-full transition-all duration-300 cursor-pointer
              ${idx === topIndex ? "bg-blue-500 shadow-lg scale-125" : "bg-gray-300 hover:bg-gray-400 hover:scale-110"}
            `}
            onClick={() => setTopIndex(idx)}
          />
        ))}
      </div> */}
    </div>
  )
}

export default ImageStack
