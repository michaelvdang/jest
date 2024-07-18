// 2. Mocking the database, we need to use Dependency Injection: 
// wrap app in a function and pass in database
// so we can choose to pass in prod or test database
// import app from './app.js'
import makeApp from './app.js'
import database from './database.js'

// 1. move the app to another file so we can 
// 'bind the testing server to whatever port we choose here'

// // switching between prod and test database
// const app = makeApp(database)
const app = makeApp(database)
// const app = makeApp({
//   getUser: (username) => {
//     return {
//       userId: 123
//     }
//   },
//   createUser: (username, password) => {
//     return {
//       userId: 123
//     }
//   }
// })

app.listen(8080, () => {
  console.log('Server is running on port 8080')
})