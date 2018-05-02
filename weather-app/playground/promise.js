var asyncAdd =  (a, b) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // body...
      if (typeof a === 'number' && typeof b === 'number') {
        resolve(a + b);
      } else {
        reject('Arguments must be numbers');
      }
    }, 1500)
  })
}

asyncAdd(3,'5')
.then(res => {
  console.log(`Result:${res}`);
  return asyncAdd(res, 42);
})
.then(res => console.log(`Shoule be 50  => ${res}`))
.catch(errorMessage => console.log(errorMessage))


// var somePromise = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     resolve('Hey. It worked');
//     resolve();
//     reject('Unable to fulfill promise');
//   }, 2500)
// });
//
// somePromise
// .then(message => console.log('Success: ', message), errorMsg => console.log('Error', errorMsg))
