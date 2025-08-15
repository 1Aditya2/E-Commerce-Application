export const debounce = (delay = 2000, callBackFn) => {
    let timeoutId;
    return function(...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            callBackFn(...args);
        }, delay);
    };
};
export const capsFirst = (string = '') => {
    if (string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
}
export const cancelClickDefault = e => {
    if (e) {
      if (e?.preventDefault) { e.preventDefault(); }
      if (e?.stopPropagation) { e.stopPropagation(); }
    }
  };