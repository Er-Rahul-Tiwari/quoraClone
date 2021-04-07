export const loadState = () => {
  try {
    const serializedState = getCookie("state");
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

export const saveState = (state) => {
  try {
    const serializesState = JSON.stringify(state);
    setCookie("state", serializesState, 1);
  } catch (err) {
    console.log(err);
  }
};

export function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  var expires = "expires="+d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

export function getCookie(cname) {
  var name = cname + "=";
  var ca = document.cookie.split(';');
  for(var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return null;
}

export function checkCookie(cname) {
  var user = getCookie(cname);
  if (user) {
    return true;
  } 
  return false;
} 

export function removeCookie(cname){  
  document.cookie = cname + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; sameSite: 'none'; secure: true; path=/;";
}