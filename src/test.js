// let v = "1.0.2-BETA15".replace(/(beta)([0-9]*)/i, (w, a, b, c) => {
//   return a.toLocaleLowerCase() + (Number(b) + 1);
// });

// console.log(v);


// console.log('1.0.2-BETA12'.match(/beta/i));


console.log('1.0.2'.replace(/(.*?)([0-9]*)$/, (w, a, b) => {
  return `${a}${Number(b) + 1}`;
}));


