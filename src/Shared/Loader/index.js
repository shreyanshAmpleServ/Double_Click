import { useTheme } from "@mui/material"
import { useEffect, useRef } from "react"
import { gsap } from "gsap"

const Loader = () => {
  const theme = useTheme()
  const shapeRef = useRef(null)
  const particlesRef = useRef([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Morphing shape animation
      const tl = gsap.timeline({ repeat: -1 })

      tl.to(shapeRef.current, {
        borderRadius: "50%",
        scale: 0.8,
        rotation: 90,
        duration: 0.8,
        ease: "power2.inOut",
      })
        .to(shapeRef.current, {
          borderRadius: "0%",
          scale: 1.2,
          rotation: 180,
          duration: 0.8,
          ease: "power2.inOut",
        })
        .to(shapeRef.current, {
          borderRadius: "20%",
          scale: 1,
          rotation: 270,
          duration: 0.8,
          ease: "power2.inOut",
        })
        .to(shapeRef.current, {
          borderRadius: "50%",
          scale: 1,
          rotation: 360,
          duration: 0.8,
          ease: "power2.inOut",
        })

      // Floating particles
      gsap.to(particlesRef.current, {
        y: [-10, 10],
        x: [-5, 5],
        opacity: [0.3, 1, 0.3],
        scale: [0.5, 1.2, 0.5],
        duration: 2,
        stagger: 0.3,
        repeat: -1,
        ease: "power1.inOut",
      })
    }, shapeRef.current)

    return () => ctx.revert()
  }, [])

  const particlePositions = [
    { top: "10%", left: "20%" },
    { top: "20%", right: "15%" },
    { bottom: "15%", left: "25%" },
    { bottom: "20%", right: "20%" },
    { top: "50%", left: "10%" },
    { top: "50%", right: "10%" },
  ]

  return (
    <div className="relative flex items-center justify-center" style={{ width: "120px", height: "120px" }}>
      {/* Main morphing shape */}
      <div
        ref={shapeRef}
        className="w-16 h-16 shadow-lg"
        style={{
          background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
          boxShadow: `0 0 20px ${theme.palette.primary.main}40`,
        }}
      />

      {/* Floating particles */}
      {particlePositions.map((pos, i) => (
        <div
          key={i}
          ref={(el) => (particlesRef.current[i] = el)}
          className="absolute w-2 h-2 rounded-full"
          style={{
            backgroundColor: theme.palette.primary.main,
            ...pos,
          }}
        />
      ))}
    </div>
  )
}

export default Loader

// import { useTheme } from "@mui/material"
// import { useEffect, useRef } from "react"
// import { gsap } from "gsap"

// const Loader = () => {
//   const theme = useTheme()
//   const spinnerRef = useRef(null)
//   const innerRef = useRef(null)
//   const textRef = useRef(null)

//   useEffect(() => {
//     const ctx = gsap.context(() => {
//       // Main spinner rotation
//       gsap.to(spinnerRef.current, {
//         rotation: 360,
//         duration: 2,
//         repeat: -1,
//         ease: "none",
//       })

//       // Inner element counter-rotation with scale
//       gsap.to(innerRef.current, {
//         rotation: -360,
//         scale: [1, 1.1, 1],
//         duration: 1.5,
//         repeat: -1,
//         ease: "power1.inOut",
//       })

//       // Text pulsing
//       gsap.to(textRef.current, {
//         opacity: [0.5, 1, 0.5],
//         scale: [0.95, 1, 0.95],
//         duration: 2,
//         repeat: -1,
//         ease: "power1.inOut",
//       })
//     }, spinnerRef.current)

//     return () => ctx.revert()
//   }, [])

//   return (
//     <div className="flex flex-col items-center space-y-4">
//       {/* Spinner */}
//       <div className="relative" style={{ width: "64px", height: "64px" }}>
//         <div
//           ref={spinnerRef}
//           className="absolute inset-0 rounded-full"
//           style={{
//             background: `conic-gradient(from 0deg, transparent, ${theme.palette.primary.main}, transparent)`,
//             filter: "blur(1px)",
//           }}
//         />
//         <div
//           className="absolute inset-1 rounded-full"
//           style={{
//             backgroundColor: "white",
//             boxShadow: `inset 0 0 10px ${theme.palette.primary.main}20`,
//           }}
//         />
//         <div
//           ref={innerRef}
//           className="absolute inset-3 rounded-full flex items-center justify-center"
//           style={{
//             background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
//             boxShadow: `0 4px 12px ${theme.palette.primary.main}40`,
//           }}
//         >
//           <div className="w-2 h-2 bg-white rounded-full opacity-80" />
//         </div>
//       </div>

//       {/* Loading text */}
//       <div ref={textRef} className="text-sm font-medium tracking-wide" style={{ color: theme.palette.primary.main }}>
//         Loading...
//       </div>
//     </div>
//   )
// }

// export default Loader

// import { useTheme } from "@mui/material"
// import "./index.css"

// const Loader = () => {
//   const theme = useTheme()
//   return (
//     <div className="loading-wave">
//       <div style={{ backgroundColor: theme.palette.primary.main }} className="loading-bar"></div>
//       <div style={{ backgroundColor: theme.palette.primary.main }} className="loading-bar"></div>
//       <div style={{ backgroundColor: theme.palette.primary.main }} className="loading-bar"></div>
//       <div style={{ backgroundColor: theme.palette.primary.main }} className="loading-bar"></div>
//     </div>
//   )
// }

// export default Loader
