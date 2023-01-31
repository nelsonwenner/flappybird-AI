export const randomForInterval = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min)
}

export const newMap = (valor, start1, stop1, start2, stop2) => {
  return ((valor - start1) / (stop1 - start1)) * (stop2 - start2) + start2
}
