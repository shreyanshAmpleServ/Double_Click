import { ThemeProvider, createTheme } from "@mui/material"
import RouterProvider, { routes } from "Routes"
import { footerServiceFn } from "Services/Home"
import { useEffect } from "react"
import { HelmetProvider } from "react-helmet-async"
import { useLocalStorage } from "react-mkx-storage"
import { useQuery } from "react-query"
import "slick-carousel/slick/slick-theme.css"
import "slick-carousel/slick/slick.css"
import "./App.css"

const App = () => {
  const [theme, setTheme] = useLocalStorage("theme", {
    button: "244, 63, 94",
    surface: "rgba(255, 255, 255, 1)",
  })
  const { data: globalData } = useQuery(["QuoteLeftDetailss"], () => footerServiceFn())
  const findData = (key) => {
    return globalData?.data?.data?.filter((item) => item.key === key)?.[0]
  }

  console.log("globalData", document.getElementsByClassName("dynamic-from-server"))
  useEffect(() => {
    const styleString = findData("embedded-css")?.richText // e.g. "<style>...</style>"
    const scriptString = findData("embedded-javascript")?.richText // e.g. "<script>...</script>"

    // Inject <style> to <head>
    if (styleString && document.getElementsByClassName("dynamic-from-server").length == 0) {
      const styleMatch = styleString.match(/<style[^>]*>([\s\S]*?)<\/style>/i)
      if (styleMatch) {
        const styleEl = document.createElement("style")
        styleEl.textContent = styleMatch[1]
        document.head.appendChild(styleEl)
      }
    }

    // Inject <script> to <body>
    if (scriptString && document.getElementsByClassName("dynamic-from-server").length == 0) {
      // Parse the string into a real DOM element
      const parser = new DOMParser()
      const doc = parser.parseFromString(scriptString, "text/html")
      const newScript = doc.querySelector("script")

      if (newScript) {
        // Remove old script(s) with the same ID or class
        if (newScript.id) {
          const oldById = document.getElementById(newScript.id)
          if (oldById) oldById.remove()
        }

        if (newScript.className) {
          const oldByClass = document.getElementsByClassName(newScript.className)
          Array.from(oldByClass).forEach((el) => el.remove())
        }

        // Recreate the script to ensure it executes
        const replacement = document.createElement("script")

        // Copy attributes
        Array.from(newScript.attributes).forEach((attr) => {
          replacement.setAttribute(attr.name, attr.value)
        })

        // Copy inline script content
        replacement.textContent = newScript.textContent

        // Append to body
        document.body.appendChild(replacement)
      }
    }
  }, [globalData])

  const themeConfig = createTheme({
    palette: {
      mode: "light",
      primary: {
        main: `rgba(${theme.button}, 1)`,
        900: `rgba(${theme.button}, 0.9)`,
        800: `rgba(${theme.button}, 0.8)`,
        700: `rgba(${theme.button}, 0.7)`,
        600: `rgba(${theme.button}, 0.6)`,
        500: `rgba(${theme.button}, 0.5)`,
        400: `rgba(${theme.button}, 0.4)`,
        300: `rgba(${theme.button}, 0.3)`,
        200: `rgba(${theme.button}, 0.2)`,
        100: `rgba(${theme.button}, 0.1)`,
      },
    },
  })

  return (
    <HelmetProvider>
      <ThemeProvider theme={themeConfig}>
        <RouterProvider />
      </ThemeProvider>
    </HelmetProvider>
  )
}

export default App
