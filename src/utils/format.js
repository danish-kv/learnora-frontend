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
  



export const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-IN', {
    year : 'numeric',
    month : 'short',
    day : 'numeric'

  })
}


// formatUtils.js

import { format } from "date-fns";


export const formatMessageTime = (timestamp) => {
  return format(new Date(timestamp), "HH:mm");
};


import { isToday, isYesterday, differenceInCalendarDays } from 'date-fns';

export const formatMessageDateHeader = (dateString) => {
  const date = new Date(dateString);

  if (isNaN(date)) {
    return "";
  }

  if (isToday(date)) {
    return 'Today';
  } else if (isYesterday(date)) {
    return 'Yesterday';
  } else {
    return format(date, 'dd/MM/yyyy');
  }
};



export const isDifferentDay = (currentMessageDate, previousMessageDate) => {
  return (
    differenceInCalendarDays(new Date(currentMessageDate), new Date(previousMessageDate)) !== 0
  );
};
