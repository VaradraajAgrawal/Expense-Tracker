class Pirate {
  constructor(name, bounty) {
    this.name = name;
    this.bounty = bounty;
  }

  announce() {
    console.log(`Name of pirate ${this.name} and bounty ${this.bounty}`);
  }
}

const luffy = new Pirate("Luffy", 10000000);
luffy.announce();

class Captain extends Pirate {
  constructor(Ship, Name, Bounty) {
    super(Name, Bounty);
    this.Ship = Ship;
  }

  announce() {
    console.log(`Captain ${this.name} is commanding ship ${this.Ship}`);
  }
}

const Cap = new Captain("SunnyGO", "Luffy", 10000000);
Cap.announce();

class ErrorHandler extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;

    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = ErrorHandler;
