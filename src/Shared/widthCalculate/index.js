export const widthCalculate = (value) => {
  if (value === "Full") {
    return "lg:w-[100%]"
  } else if (value === "Half") {
    return "lg:w-[50%]"
  } else if (value) {
    const parts = value?.split("-")
    const number = parseInt(parts[parts?.length - 1])
    return `lg:w-[${number}%]`
  }
}
export const fontSizeCalc = (value) => {
  const fontSize = value?.split(":")[1]
  return fontSize
}
