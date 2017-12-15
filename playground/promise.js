var asyncAdd = (a, b) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (typeof a === 'number' && typeof b === 'number') {
        resolve(a + b);
      } else {
        reject('Arguments must be numbers!');
      }
    }, 500);
  })
}

asyncAdd(1, 'g').then((res) => {
  console.log('Result: ', res);
  return asyncAdd(res, 23);
}).then((res) => {
  console.log('Should be 28', res);
}).catch(errorMessage => {
  console.log(errorMessage);
})


// var somePromise = new Promise((resolve, reject) => {
//   setTimeout(() =>  {
//     resolve('Hey, It worked!');
//     // reject('Unable to fulfill promise');
//   }, 250);
// });
//
// somePromise.then((message) => {
//   console.log('Success', message);
// }, (errorMessage) => {
//   console.log('Error', errorMessage);
// });
