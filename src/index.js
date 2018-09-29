import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";

const dayz = {
  Monday: true,
  Tuesday: true,
  Wednesday: true,
  Thursday: true,
  Friday: true,
  Saturday: true,
  Sunday: false
};

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

function isNumber(num) {
  return !isNaN(parseFloat(num)) && isFinite(num);
}

let calculateHoursPreFunctional = function(
  totalHours,
  daysAutoWorking,
  smallestCountedAmmount
) {
  let hoursAddedToEachDay = 0;
  // console.log(totalHours, daysAutoWorking, smallestCountedAmmount);
  while (totalHours >= daysAutoWorking * smallestCountedAmmount) {
    const hoursOffset = daysAutoWorking * smallestCountedAmmount;
    totalHours -= hoursOffset;
    hoursAddedToEachDay += hoursOffset / daysAutoWorking;
  }
  return hoursAddedToEachDay;
};

const daysAutoCalculatedFunction = function(
  schedule,
  hoursWorking,
  manuallyEnteredHoursAdded,
  daysAutoWorking2
) {
  let totalHours2 = hoursWorking - manuallyEnteredHoursAdded;

  let hoursAddedToEachDay3 = returnIfTrue(
    daysAutoWorking2 > 0,
    calculateHoursPreFunctional(totalHours2, daysAutoWorking2, 0.25),
    0
  );

  let schedule2 = schedule.map(day =>
    returnIfTrue(isNumber(day), day, hoursAddedToEachDay3)
  );
  schedule2.push(totalHours2 - hoursAddedToEachDay3 * daysAutoWorking2);
  return schedule2;
};

const returnIfTrue = function(bool, value, elseReturn) {
  // console.log(bool, value, elseReturn);
  if (bool) {
    return value;
  } else {
    return elseReturn;
  }
};
// function extractManuallyEnteredHours(schedule){}

function Schedule(schedule) {
  // console.log(schedule);
  this.rawSchedule = schedule.days;
  this.rawScheduleArrays = converObjectToArray(this.rawSchedule);
  this.hoursWorking = schedule.workHours;
  this.rawScheduleArraysSorted = this.rawScheduleArrays.map(officer =>
    returnIfTrue(officer[1][0], true, officer[1][1])
  );
  this.calculatedSchedule = [];
  this.daysAutoWorking = this.rawScheduleArrays
    .map(day => Compare(day[1][0], true))
    .reduce(add);
  this.finalSchedule = [];
  this.completeSchedule = function() {
    this.combinedScheduleFunction();
    numberOfAutoDays;
  };
  this.manuallyEnteredHoursAdded = this.rawScheduleArrays
    .map(day => returnIfTrue(Compare(day[1][0], false), day[1][1], false))
    .reduce(add);
  this.combinedSchedule = daysAutoCalculatedFunction(
    this.rawScheduleArraysSorted,
    this.hoursWorking,
    this.manuallyEnteredHoursAdded,
    this.daysAutoWorking
  );
}

let hoursAndBooleanCombined = function hoursAndBooleanCombined(dayData: Array) {
  if (dayData) {
    if (dayData[0]) {
      return true;
    } else {
      return dayData[1];
    }
  }
  return dayData;
};

let calculateAutoHours = function calculateAutoHours(schedule) {
  let rawWorkArray = [];
  for (let day in schedule) {
    rawWorkArray.push(hoursAndBooleanCombined(schedule[day]));
  }
};

let numberOfAutoDays = function numberOfAutoDays(schedule) {
  let autoDays = 0;
  for (let day in schedule) {
    if (schedule[day] === true) {
      autoDays++;
    }
  }
  return autoDays;
};

function DisplaySchedule(props) {
  let people = props.people;
  let displayPeople = {};

  let hoursTogether = { combinedSchedule: [] };
  for (let person in people) {
    displayPeople[person] = new Schedule(people[person]);
    console.log(displayPeople[person]);
    hoursTogether.combinedSchedule = displayPeople[person].combinedSchedule.map(
      (day, index) =>
        returnIfTrue(
          isNumber(hoursTogether.combinedSchedule[index]),
          day + hoursTogether.combinedSchedule[index],
          day
        )
    );
  }
  displayPeople["Combind Schedule"] = hoursTogether;
  // console.log(hoursTogether);

  function RowBuilder(props) {
    let person = props.person;
    return (
      <tr>
        {person.map(function(row, i) {
          return <td>{row}</td>;
        }, this)}
      </tr>
    );
  }

  return (
    <table>
      <tbody>
        <th key={"name"}>Name:</th>
        {Object.entries(dayz).map(function(day, i) {
          return <th key={day[0]}>{day[0]}</th>;
        }, this)}
        <th key={"Extra Hours"}>Extra Hours</th>
        {Object.entries(displayPeople).map(function(person, i) {
          const nameAndSchedule = [person[0]].concat(
            person[1].combinedSchedule
          );
          // console.log(nameAndSchedule);
          return <RowBuilder person={nameAndSchedule} />;
        }, this)}
      </tbody>
    </table>
  );
}

class Reservation extends React.Component {
  constructor(props) {
    super(props);
    const daysArray = {};
    let personDictionary = {};
    for (var i in props.days) daysArray[i] = [props.days[i], 0];
    this.state = {
      personDictionary: personDictionary,
      daysArray: daysArray,
      Hours_Working: 0,
      name: ""
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    // const disabled = value ? "disabled" : "";
    let days = this.state.daysArray;
    if (target.type === "checkbox") {
      days[target.name][0] = value;
      this.setState({
        daysArray: days
      });
    } else if (target.type === "number") {
      if (target.name === "Hours_Working") {
        this.setState({
          Hours_Working: Number(value)
        });
      } else {
        days[target.name][1] = Number(value);
        this.setState({
          daysArray: days
        });
      }
    } else if (target.type === "text") {
      this.setState({
        name: value
      });
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    let newPersonDictionary = JSON.parse(
      JSON.stringify(this.state.personDictionary)
    );

    let newDaysArray = JSON.parse(JSON.stringify(this.state.daysArray));
    newPersonDictionary[this.state.name] = {
      days: newDaysArray,
      workHours: this.state.Hours_Working
    };
    this.setState({
      personDictionary: newPersonDictionary
    });
  }

  render() {
    return (
      <div>
        <InputForm
          personName={this.state.name}
          daysArray={this.state.daysArray}
          Hours_Working={this.state.Hours_Working}
          handleSubmit={this.handleSubmit}
          handleInputChange={this.handleInputChange.bind(this)}
        />
        <DisplaySchedule people={this.state.personDictionary} />
      </div>
    );
  }
}
function InputForm(props) {
  return (
    <form style={{ flex: 1 }} onSubmit={props.handleSubmit}>
      <input type="submit" value="React Submit" />
      <table>
        <tbody>
          <tr>
            <label htmlFor="Hours_Working">Hours Working:</label>
            <input
              type="number"
              name="Hours_Working"
              value={props.Hours_Working}
              onChange={props.handleInputChange}
            />
          </tr>
          <tr>
            <th>
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                name="firstname"
                value={props.personName}
                onChange={props.handleInputChange}
              />
            </th>
            {Object.entries(props.daysArray).map(function(day, i) {
              return (
                <th key={day[0]}>
                  <IndividualDay
                    name={day[0]}
                    handleInputChange={props.handleInputChange}
                    checked={day[1][0]}
                  />
                  <p />
                  <input
                    name={day[0]}
                    type="number"
                    width="1"
                    title="Monday Manual Hours"
                    disabled={day[1][0]}
                    onChange={props.handleInputChange}
                  />
                </th>
              );
            }, this)}
          </tr>
        </tbody>
      </table>
    </form>
  );
}
function IndividualDay(props) {
  return (
    <React.Fragment>
      <label htmlFor="1">{props.name}</label>
      <input
        type="checkbox"
        name={props.name}
        onChange={props.handleInputChange}
        checked={props.checked}
      />
    </React.Fragment>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<Reservation days={dayz} />, rootElement);
