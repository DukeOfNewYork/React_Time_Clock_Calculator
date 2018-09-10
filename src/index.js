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

function Schedule(schedule) {
  this.rawSchedule = schedule;
  this.combinedSchedule = {};
  this.calculatedSchedule = [];
  this.hoursWorking = 0;
  this.daysAutoWorking = 0;
  this.finalSchedule = [];
  this.combinedScheduleFunction = function() {
    let rawWorkArray = [];
    let schedule2 = this.rawSchedule;
    let daysAutoWorking = 0;
    for (let day in schedule2) {
      rawWorkArray.push(hoursAndBooleanCombined(schedule2[day]));
      if (schedule2[day][0] === true) {
        daysAutoWorking++;
      }
    }
    this.daysAutoWorking = daysAutoWorking;
    this.combinedSchedule = rawWorkArray;
  };

  this.daysAutoCalculatedFunction = function() {
    const schedule = this.combinedSchedule;
    let startingHours = this.hoursWorking;
    let totalHours = 40;
    let manualHours = 0.25;
    let hoursAddedToEachDay = 0;
    if (this.daysAutoWorking > 0) {
      while (totalHours >= this.daysAutoWorking * manualHours) {
        const hoursOffset = this.daysAutoWorking * manualHours;
        totalHours -= hoursOffset;
        hoursAddedToEachDay += hoursOffset / this.daysAutoWorking;
      }
    }
    schedule.push(totalHours);
    for (let day in schedule) {
      if (schedule[day] === true) {
        schedule[day] = hoursAddedToEachDay;
      }
    }
    this.combinedSchedule = schedule;
  };

  this.completeSchedule = function() {
    this.combinedScheduleFunction();
    numberOfAutoDays;
  };
  this.combinedScheduleFunction();
  this.daysAutoCalculatedFunction();
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

  for (let person in people) {
    displayPeople[person] = new Schedule(people[person]);
    console.log(displayPeople);
    // console.log(displayPeople[person]);
  }

  function RowBuilder(props) {
    let person = props.person;
    return (
      <tr>
        {person.map(function(row, i) {
          // console.log(person);
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
      days[target.name][1] = value;
      this.setState({
        daysArray: days
      });
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
    newPersonDictionary[this.state.name] = newDaysArray;
    this.setState({
      personDictionary: newPersonDictionary
    });
  }

  render() {
    // hoursAndBooleanCombined();
    return (
      <div>
        <InputForm
          personName={this.state.name}
          daysArray={this.state.daysArray}
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
            <th>
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                name="firstname"
                value={props.personName}
                // onChange={(event) => this.setState({
                //   name: event.target.value
                // })}
                onChange={props.handleInputChange}
                // autoFocus
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
