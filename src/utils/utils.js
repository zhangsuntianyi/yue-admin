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
