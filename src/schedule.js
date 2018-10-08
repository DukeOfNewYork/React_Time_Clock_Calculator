const functionalFunctions = require("./functional.js");

function Schedule(schedule) {
  this.rawSchedule = schedule.days;
  this.rawScheduleArrays = functionalFunctions.converObjectToArray(
    this.rawSchedule
  );
  this.hoursWorking = schedule.workHours;
  this.rawScheduleArraysSorted = this.rawScheduleArrays.map(day =>
    functionalFunctions.returnIfTrue(day[1][0], true, day[1][1])
  );
  this.daysAutoWorking = this.rawScheduleArrays
    .map(day => functionalFunctions.Compare(day[1][0], true))
    .reduce(functionalFunctions.add);
  this.manuallyEnteredHoursAdded = this.rawScheduleArrays
    .map(day =>
      functionalFunctions.returnIfTrue(
        functionalFunctions.Compare(day[1][0], false),
        day[1][1],
        false
      )
    )
    .reduce(functionalFunctions.add);
  this.combinedSchedule = daysAutoCalculatedFunction(
    this.rawScheduleArraysSorted,
    this.hoursWorking,
    this.manuallyEnteredHoursAdded,
    this.daysAutoWorking
  );
}

const calculateAutoDayHours = function(
  totalHours,
  daysAutoWorking,
  smallestCountedAmmount
) {
  const totalMinumalIncrements = totalHours / smallestCountedAmmount;
  const incrementsPerDay = Math.floor(totalMinumalIncrements / daysAutoWorking);
  return incrementsPerDay * smallestCountedAmmount;
};

const daysAutoCalculatedFunction = function(
  //Returns a number only array and calculates the auto hours
  schedule,
  hoursWorking,
  manuallyEnteredHoursAdded,
  daysAutoWorking
) {
  const totalHoursToCalculate = hoursWorking - manuallyEnteredHoursAdded;

  const hoursAddedToEachDay3 = functionalFunctions.returnIfTrue(
    daysAutoWorking > 0,
    calculateAutoDayHours(totalHoursToCalculate, daysAutoWorking, 0.25),
    0
  );

  let finishedSchedule = schedule.map(day =>
    functionalFunctions.returnIfTrue(
      functionalFunctions.isNumber(day),
      day,
      hoursAddedToEachDay3
    )
  );
  finishedSchedule.push(
    totalHoursToCalculate - hoursAddedToEachDay3 * daysAutoWorking
  );
  return finishedSchedule;
};

exports.Schedule = Schedule;
