export const formatDuration = (sec) => {
  const hours = Math.floor(sec / 3600);
  const minutes = Math.floor((sec % 3600) / 60);
  const remainingSeconds = sec % 60;

    if (hours > 0) {
        return `${hours} hours ${minutes} min ${remainingSeconds} sec`
        
    }else if (minutes > 0){
        return `${minutes} min ${remainingSeconds} sec`
    }else{
        return `${remainingSeconds} sec`
    }
}



export function capitalizeFirstLetter(str) {
    if (typeof str !== "string") {
      return ""; 
    }
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  

export const formatDateTime = (date) => {
  const d = new Date(date);
  return `${d.getFullYear()}-${(d.getMonth() + 1)
    .toString()
    .padStart(2, "0")}-${d.getDate().toString().padStart(2, "0")} ${d
    .getHours()
    .toString()
    .padStart(2, "0")}:${d.getMinutes().toString().padStart(2, "0")}:${d
    .getSeconds()
    .toString()
    .padStart(2, "0")}`;
};
