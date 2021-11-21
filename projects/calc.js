angular
  .module("calculator", [])

  .controller("calculatorCtrl", function () {
    this.value = "";
    this.buffer = "";

    this.num = function (num) {
      if (this.cmd) {
        this.buffer += num;
      } else {
        this.value += num;
      }
    };

    this.negate = function () {
      var neg = function (val) {
        return "" + -1 * val;
      };
      if (this.buffer) {
        this.buffer = neg(this.buffer);
      } else {
        this.value = neg(this.value);
      }
    };

    this.op = function (op) {
      if (this.cmd) {
        this.compute();
      }
      if (op === "+")
        this.cmd = function (x, y) {
          return x + y;
        };
      else if (op === "-")
        this.cmd = function (x, y) {
          return x - y;
        };
      else if (op === "/")
        this.cmd = function (x, y) {
          return x / y;
        };
      else if (op === "*")
        this.cmd = function (x, y) {
          return x * y;
        };
    };

    this.clear = function () {
      this.value = "";
      this.buffer = "";
    };

    this.compute = function () {
      if (this.cmd) {
        this.value = this.cmd(1 * this.value, 1 * this.buffer);
        this.buffer = "";
        this.cmd = undefined;
      }
    };
  });
