// Import stylesheets
import './style.css';

const log = (msg) => console.log(msg);

// Write Javascript code!
const appDiv = document.getElementById('app');
appDiv.innerHTML = `<h1>Design Patterns</h1>`;

log('/// Factory Pattern ///');

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
// log(hondaInfo);
// log(hondaInfo.makeInfo);

// Singleton Pattern
// Problem: Assume we have a database for an application. We need a single database connection
// across the application. So, we need to find a way to store this database connection after it got initialized once. This is where Single Pattern helps. It keeps the reference to the initialized object.

log('/// Singleton Pattern ///');

const db = (function () {
  function Database(username, password) {
    this.username = username;
    this.password = password;
    log('Connection Initialized!');
  }

  let dbInstance = null;

  return {
    getInstance: function () {
      if (!dbInstance) {
        dbInstance = new Database('user', 'pass');
        dbInstance.constructor = null; // Set constructor to null after storing instance in a variable
      }
      return dbInstance;
    },
  };
})();

// const dbConnection = db.getInstance();
// const dbConnection1 = db.getInstance();
// const dbConnection2 = db.getInstance();
// log(dbConnection);
// log(dbConnection1);
// log(dbConnection2); // We see only one time database connection was initialized. That's singleton!

// Strategy Pattern
log('/// Strategy Pattern ///');
/**
 * Problem: Get quote from various insurance providers using Strategy pattern
 */

function TDInsurance(quote) {
  this.provider = 'TD Insurance';
  this.getQuote = () => 80;
}
function ScotiaInsurance(quote) {
  this.provider = 'Scotia Insurance';
  this.getQuote = () => 75;
}
function RBCInsurance(quote) {
  this.provider = 'RBC Insurance';
  this.getQuote = () => 88;
}

const td = new TDInsurance();
const scotia = new ScotiaInsurance();
const rbc = new RBCInsurance();

// Build a master strategry class to be able to call insurance provider based on choice/strategy
function InsuranceStrategy() {
  this.insuranceProvider = null;
  this.setStrategry = (provider) => {
    this.insuranceProvider = provider;
  };
}

// InsuranceStrategy will have setStrategy to be able to set the insurance provider of choice
// Since all providers implement getQuote method, it's easy to

// const strategy = new InsuranceStrategy();
// log(strategy);

// For example, if we want to get quote from TD, then set the strategy to TD, and get quotation by calling getQuote()

// strategy.setStrategry(td);
// log(strategy.insuranceProvider.getQuote());

log('/// Proxy Pattern ///');
/**
 * Problem: network calls are expensive. Implement a proxy to abstract the complex logic,
 * and optimize the application to send less number of API calls.
 */

function CarPrices() {
  this.price = 0;

  this.getCarPrice = function (model) {
    switch (model) {
      case 'accord':
        this.price = 40000;
        break;
      case 'civic':
        this.price = 32000;
        break;
      default:
        break;
    }
    // log('API call in progress. Please wait...');
    // return this.price;

    // Simulates network call that takes 2s in this case
    return new Promise((resolve) => {
      log('API call in progress. Please wait...');
      const start = Date.now();
      setTimeout(() => {
        resolve(this.price);
        const end = Date.now();
        log(
          `Received results from API in ${(end - start) / 1000}s. Price is: ${
            this.price
          }`
        );
      }, 2000);
    });
  };
}

function Proxy(model) {
  this.models = new Map();
  this.carPricesApi = new CarPrices();

  this.getCarPrice = async function () {
    if (!this.models.has(model)) {
      const carPrice = await this.carPricesApi.getCarPrice(model);

      if (carPrice > 0) {
        this.models.set(model, carPrice);

        for (const [key, value] of this.models) {
          log(`${key}: ${value}`);
        }
      }
      log(`${this.models.get(model) && "Couldn't find cached value"}`);
      return carPrice;
    } else {
      log(`${this.models.get(model) && 'Using cached value'}`);
      return this.models.get(model);
    }
  };
}

/**
 * We call Proxy with desired car model. If car model exists, it will return price.
 * Also, caches the car price in a Map. This will help us eliminate expensive
 * operations such as calling an API for the same price again. Optionally can
 * implement cache time. Uncomment below to test the Proxy Pattern!
 */
// (async function () {
//   const prices = new Proxy('accord');
//   log(await prices.getCarPrice());
//   log(await prices.getCarPrice());
//   log(await prices.getCarPrice());
//   log(await prices.getCarPrice());
// })();

log('/// Method Chaining Pattern ///');
/**
 * Problem: Build an ATM using Method Chaining pattern
 */

function ATM(amountToWithdraw) {
  this.amount = parseInt(amountToWithdraw);
  this.allowedDenominations = new Set([100, 50, 20, 10, 5, 1]); // Valid USD denominations

  this.denomination = function (denomination) {
    if (!this.allowedDenominations.has(parseInt(denomination))) {
      new Error(
        'Unable to dispense money in the form of requested denomination'
      );
      return;
    }

    const numOfBillsPossible = Math.floor(this.amount / denomination);
    this.amount = this.amount - numOfBillsPossible * denomination; // Remove possible amount based on given denomination from the total amount, so we will be left over with remaining money to work with.
    log(
      `$${denomination} x ${numOfBillsPossible} = $${
        denomination * numOfBillsPossible
      }. Balance: $${this.amount}`
    );

    // log(
    //   `You will get ${numOfBillsPossible} bills in the form of $${denomination} denomination.`
    // );
    // log(
    //   `Choose denominations for remaining balance of $${this.amount}`
    // );
    return this; // returning this will allow us to call `denomination` method on the same context. Sort of creating a closed tube.
  };
}

// const atm = new ATM(228);
// atm.denomination(10).denomination(5).denomination(1);

log('/// Recursion Pattern ///');
const factorial = (n) => {
  if (!n) return;

  if (n === 1 || n === 0) return 1;
  else return n * factorial(n - 1);
};

console.log(factorial(4));
