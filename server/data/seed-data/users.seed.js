const now = new Date();

module.exports = [{
  firstName: 'Ivan',
  lastName: 'Ivanov',
  phone: '+(38)0111111111',
  gender: 'Male',
  age: '24',
}, {
  firstName: 'Petro',
  lastName: 'Petrov',
  phone: '+(38)0222222222',
  gender: 'Male',
  age: '23',
}, {
  firstName: 'Pavel',
  lastName: 'Pavlov',
  phone: '+(38)0333333333',
  gender: 'Male',
  age: '22',
}, {
  firstName: 'Maria',
  lastName: 'Ivanova',
  phone: '+(38)0444444444',
  gender: 'Female',
  age: '21',
}, ].map(user => ({
    ...user,
    createdAt: now,
    updatedAt: now
}));
