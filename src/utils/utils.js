import _ from 'lodash';

export const canTurnTo = (permissions, userPermissions) => {
  // 如果权限为空，则不需要权限
  if (!permissions || permissions.length === 0) {
    return true;
  }

  // 需要的权限与用户拥有的权限比较
  const mergePermissions = _.intersection(permissions, userPermissions);
  // 如果有权限，则返回true
  if (mergePermissions.length > 0) {
    return true;
  }

  // 以上都不是，则没权限访问
  return false;
};

export const findNodeUpperByClasses = (ele, classes) => {
  let parentNode = ele.parentNode;
  if (parentNode) {
    let classList = parentNode.classList;
    if (classList && classes.every(className => classList.contains(className))) {
      return parentNode;
    } else {
      return findNodeUpperByClasses(parentNode, classes);
    }
  }
};

/**
 * @description 绑定事件 on(element, event, handler)
 */
export const on = (element, event, handler) => {
  if (element && event && handler) {
    if (document.addEventListener) {
      element.addEventListener(event, handler, false);
    } else {
      element.attachEvent(`on${event}`, handler);
    }
  }
};

/**
 * @description 解绑事件 off(element, event, handler)
 */
export const off = (element, event, handler) => {
  if (element && event && handler) {
    if (document.removeEventListener) {
      element.removeEventListener(event, handler, false);
    } else {
      element.detachEvent(`on${event}`, handler);
    }
  }
};

/**
 * 打开或退出全屏
 * @param isFullscreen
 */
export const onOffFullscreen = (isFullscreen) => {
  let main = document.body;
  if (isFullscreen) {
    if (document.exitFullscreen) {
      document.exitFullscreen()
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen()
    } else if (document.webkitCancelFullScreen) {
      document.webkitCancelFullScreen()
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen()
    }
  } else {
    if (main.requestFullscreen) {
      main.requestFullscreen()
    } else if (main.mozRequestFullScreen) {
      main.mozRequestFullScreen()
    } else if (main.webkitRequestFullScreen) {
      main.webkitRequestFullScreen()
    } else if (main.msRequestFullscreen) {
      main.msRequestFullscreen()
    }
  }
};
