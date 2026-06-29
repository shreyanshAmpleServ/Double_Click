import React, { useRef, useEffect, useState } from "react"

/**
 * Image component with lazy loading.
 * @param {object} props - Component props.
 * @param {string} props.src - The URL of the image.
 * @param {string} [props.alt] - Alt text for the image.
 * @param {string} [props.altImage=""] - The URL of the alternative image to display if the original image fails to load.
 * @param {string} [props.placeholder=""] - Placeholder image while loading.
 * @param {React.HTMLProps<HTMLImageElement>} [props.options] - Additional props to pass to the img element.
 * @returns {React.ReactElement<HTMLImageElement>} The rendered img element.
 */
const Image = ({ src, alt = "", altImage = "", placeholder = "", ...options }) => {
  const [imageSrc, setImageSrc] = useState(placeholder || "")
  const imgRef = useRef(null)

  useEffect(() => {
    if (!src) {
      setImageSrc(placeholder || "")
      return
    }

    if (!("IntersectionObserver" in window)) {
      setImageSrc(src)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setImageSrc(src)
            observer.unobserve(entry.target)
          }
        })
      },
      { rootMargin: "80px" }
    )

    if (imgRef.current) {
      observer.observe(imgRef.current)
    }

    return () => {
      if (imgRef.current) {
        observer.unobserve(imgRef.current)
      }
      observer.disconnect()
    }
  }, [src, placeholder])

  return (
    <img
      ref={imgRef}
      src={imageSrc}
      alt={alt}
      loading="lazy"
      decoding="async"
      onError={(e) => {
        e.target.onerror = null
        e.target.src = altImage || placeholder
      }}
      {...options}
    />
  )
}

export default Image
