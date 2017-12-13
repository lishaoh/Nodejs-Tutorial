console.log('Starting app');

setTimeout(() => {
  console.log('Inside callback');
}, 500);

setTimeout(() => {
  console.log('Second setTimeout');
}, 0)

console.log('Finishing up');
