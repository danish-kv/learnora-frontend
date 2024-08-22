export const formatDuration = (sec) => {
    const hours = Math.floor(sec / 3600)
    const minutes = Math.floor((sec % 3600) / 60)
    const remainingSeconds = sec % 60

    if (hours > 0) {
        return `${hours} hours ${minutes} min ${remainingSeconds} sec`
        
    }else if (minutes > 0){
        return `${minutes} min ${remainingSeconds} sec`
    }else{
        return `${remainingSeconds} sec`
    }
}