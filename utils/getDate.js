export const getDate = () => {
  let date = new Date()

  let day = date.getDate()
  let month = date.getMonth() + 1
  let year = date.getFullYear()

  if(month < 10){
    return `${year}-0${month}-${day}`
  }else{
    return `${year}-${month}-${day}`
  }
}