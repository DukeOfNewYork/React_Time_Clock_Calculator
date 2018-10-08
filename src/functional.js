const inputReject = function(input, reject) {};

function existy(x) {
  return x != null;
}

function truthy(x) {
  return x !== false && existy(x);
}

const Compare = function(input, compare) {
  return input === compare;
};

const add = (a, b) => a + b;

const converObjectToArray = function(object) {
  return Object.entries(object);
};

const placeHolder = function(obj) {
  return obj;
};

const isNumber = function(num) {
  return !isNaN(parseFloat(num)) && isFinite(num);
};

const returnIfTrue = function(bool, value, elseReturn) {
  if (bool) {
    return value;
  } else {
    return elseReturn;
  }
};

// module.exports = {
//   returnIfTrue: returnIfTrue,
//   daysAutoCalculatedFunction: daysAutoCalculatedFunction,
//   calculateAutoDayHours: calculateAutoDayHours,
//   isNumber: isNumber,
//   placeHolder: placeHolder,
//   converObjectToArray: converObjectToArray,
//   add: add,
//   Compare: Compare,
//   truthy: truthy,
//   existy: existy,
//   inputReject: inputReject
// };

exports.inputReject = inputReject;
exports.existy = existy;
exports.truthy = truthy;
exports.Compare = Compare;
exports.add = add;
exports.converObjectToArray = converObjectToArray;
exports.placeHolder = placeHolder;
exports.isNumber = isNumber;
exports.returnIfTrue = returnIfTrue;
