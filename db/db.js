const fs = require("fs");

function loadRegHelper(reloadAnyway) {
  if (typeof Reg !== "undefined" && reloadAnyway == null) {
    return;
  }

  return new (function() {
    var file = "./Registro3.json";
    this.data = {};

    try {
      this.data = JSON.parse(fs.readFileSync(file));
    } catch (e) {
      fs.writeFileSync(file, "{}");
    }

    this.save = function(key, value) {
      this.data[key] = value;
      this.saveData();
    };

    this.init = function(key, value) {
      if (this.data[key] === undefined) {
        this.data[key] = value;
        this.saveData();
      }
    };

    this.get = function(key) {
      return this.data[key];
    };

    this.remove = function(key) {
      if (this.data[key] != undefined) {
        delete this.data[key];
        this.saveData();
      }
    };

    this.removeIf = function(func) {
      var x,
        d = this.data,
        madeChange = false;
      for (x in d) {
        if (func(d, x)) {
          delete d[x];
          madeChange = true;
        }
      }

      if (madeChange) {
        this.saveData();
      }
    };

    this.removeIfValue = function(key, value) {
      if (this.data[key] === value) {
        delete this.data[key];
        this.saveData();
      }
    };

    this.saveData = function() {
      fs.writeFileSync(file, JSON.stringify(this.data), "utf8", err => {
        if (err) throw err;
      });
    };

    this.clearAll = function() {
      this.data = {};
      this.saveData();
    };
  })();
}

module.exports = {
  loadRegHelper
}