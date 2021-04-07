const timeElapsed = (date) => {
  let elapsed;
  let diff = (new Date() - date) / 1000;
  if (diff / 31104000 < 1) {
    if (diff / 2592000 < 1) {
      if (diff / 86400 < 1) {
        if (diff / 3600 < 1) {
          if (diff / 60 < 1) {
            elapsed = "just now";
          } else {
            if(Math.round(diff / 60) == 1) elapsed = "1 minute ago";
            elapsed = Math.round(diff / 60) + " minutes ago";
          }
        } else {
          if(Math.round(diff / 3600) == 1) elapsed = "1 hour ago";
          elapsed = Math.round(diff / 3600) + " hours ago";
        }
      } else {
        if(Math.round(diff / 86400) == 1) elapsed = "1 day ago";
        elapsed = Math.round(diff / 86400) + " days ago";
      }
    } else {
      if(Math.round(diff / 2592000) == 1) elapsed = "1 month ago";
      elapsed = Math.round(diff / 2592000) + " months ago";
    }
  } else {
    if(Math.round(diff / 31104000) == 1) elapsed = "1 year ago";
    elapsed = Math.round(diff / 31104000) + " years ago";
  }
  return elapsed;
};

export default timeElapsed;
