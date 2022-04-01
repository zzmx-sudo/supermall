export function debounce(func, delay) {
  let time = null;
  return function (...args) {
    // 如果time存在（表示上次setTimeout函数未到执行时间）则清除计时器
    if (time) clearTimeout(time);
    time = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}