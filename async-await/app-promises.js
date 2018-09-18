const users = [{
  id: 1,
  name: 'Andrew',
  schoolId: 110
}, {
  id: 2,
  name: 'lsh',
  schoolId: 111
}];

const grades = [{
    id: 1,
    schoolId: 110,
    grade: 90
  }, {
    id: 2,
    schoolId: 111,
    grade: 76
  },
  {
    id: 3,
    schoolId: 110,
    grade: 68
  }
];

const getUser = (id) => {
  return new Promise((resolve, reject) => {
    const user = users.find((user) => user.id === id);

    if (user) {
      resolve(user);
    } else {
      reject(`Unable to find user width id of ${id}`);
    }
  })
};

const getGrades = (schoolId) => {
  return new Promise((resolve, reject) => {
    resolve(grades.filter(grade => grade.schoolId === schoolId));
  })
};

const getStatus = (userId) => {
  var user;
  return getUser(userId).then(tempUser => {
    user = tempUser;
    return getGrades(user.schoolId);
  }).then((grades) => {
    let average = 0;

    if (grades.length > 0) {
      average = grades.map(grade => grade.grade).reduce((a, b) => a + b) / grades.length;
    }

    return `${user.name} has a ${average}% in the class.`;
  });
};

// async await

const getStatusAlt = async (userId) => {
  const user = await getUser(userId);
  const grades = await getGrades(user.schoolId);
  console.log(user, grades);

  let average = 0;

  if (grades.length > 0) {
    average = grades.map(grade => grade.grade).reduce((a, b) => a + b) / grades.length;
  }

  return `${user.name} has a ${average}% in the class.`;
};


getStatusAlt(2).then(status => {
  console.log(status);
}).catch(e => console.log(e));

// getStatus(1).then(status => {
//   console.log(status);
// }).catch((e) => {
//   console.log(e);
// });
