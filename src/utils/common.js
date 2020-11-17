export function getImgUrl(url, w, h) {
  if (!h) {
    h = w
  }
  url += `?param=${w}y${h}`
  return url
}

export function formatDate(date, fmt = 'yyyy-MM-dd hh:mm:ss') {
  date = date instanceof Date ? date : new Date(date)
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(
      RegExp.$1,
      (date.getFullYear() + '').substr(4 - RegExp.$1.length)
    )
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  }
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + ''
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? str : ('00' + str).slice(-2)
      )
    }
  }
  return fmt
}

export function formatNumber(number) {
  number = Number(number) || 0
  return number > 100000 ? `${Math.round(number / 10000)}万` : number
}

export function formatTime(interval) {
  interval = interval | 0
  const minute = (interval / 60) | 0
  const second = interval % 60
  // return `${minute}:${second}`
  return ('0' + minute).slice(-2) + ':' + ('0' + second).slice(-2)
}

export function requestFullScreen(element) {
  const docElm = element;
  if (docElm.requestFullscreen) {
    docElm.requestFullscreen();
  } else if (docElm.msRequestFullscreen) {
    docElm.msRequestFullscreen();
  } else if (docElm.mozRequestFullScreen) {
    docElm.mozRequestFullScreen();
  } else if (docElm.webkitRequestFullScreen) {
    docElm.webkitRequestFullScreen();
  }
}

export function exitFullscreen() {
  const de = window.parent.document;

  if (de.exitFullscreen) {
    de.exitFullscreen();
  } else if (de.mozCancelFullScreen) {
    de.mozCancelFullScreen();
  } else if (de.webkitCancelFullScreen) {
    de.webkitCancelFullScreen();
  } else if (de.msExitFullscreen) {
    de.msExitFullscreen()
  }
}

export function isFullscreen() {
  return document.fullScreen ||
    document.mozFullScreen ||
    document.webkitIsFullScreen
}

export function debounce(func, delay = 500) {
  let timer = null;
  return function () {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, arguments)
      timer = null;
    }, delay)
  }
}
export function throttle(func, delay = 300) {
  let timer = null;
  return function () {
    if (timer) return;
    timer = setTimeout(() => {
      func.apply(this, arguments);
      timer = null;
    }, delay)
  }
}