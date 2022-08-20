// Import stylesheets
import './style.css';

// Write Javascript code!
const appDiv = document.getElementById('app');
appDiv.innerHTML = `<h1>Design Patterns</h1>`;

console.log('/// Factory Pattern ///')

// Factory Function
function Vehicle(make, year) {
  this.make = make;
  this.year = year;

  Object.defineProperty(this, 'makeInfo', {
    get() {
      return this.make;
    },
    set(value) {
      this.make = value;
    },
  });
}

const hondaInfo = new Vehicle('Honda', 'Accord');
console.log(hondaInfo);
console.log(hondaInfo.makeInfo);

// Singleton Pattern
// Problem: Assume we have a database for an application. We need a single database connection
// across the application. So, we need to find a way to store this database connection after it got initialized once. This is where Single Pattern helps. It keeps the reference to the initialized object.

console.log('/// Singleton Pattern ///')

const db = (function () {
  function Database(username, password) {
    this.username = username;
    this.password = password;
    console.log('Connection Initialized!');
  }

  let dbInstance = null;

  return {
    getInstance: function () {
      if (!dbInstance) {
        dbInstance = new Database('user', 'pass');
        dbInstance.constructor = null // Set constructor to null after storing instance in a variable
      }
      return dbInstance;
    },
  };
})();

const dbConnection = db.getInstance();
const dbConnection1 = db.getInstance();
const dbConnection2 = db.getInstance();
console.log(dbConnection);
console.log(dbConnection1);
console.log(dbConnection2); // We see only one time database connection was initialized. That's singleton!

// Strategy Pattern
console.log('/// Strategy Pattern ///')


