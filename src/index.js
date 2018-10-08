import React from "react";
import ReactDOM from "react-dom";
import _ from "underscore";
import "./styles.css";

const viewFunctions = require("./view");
const functionalFunctions = require("./functional.js");

const dayz = {
  Monday: true,
  Tuesday: true,
  Wednesday: true,
  Thursday: true,
  Friday: true,
  Saturday: true,
  Sunday: false
};

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

class Reservation extends React.Component {
  constructor(props) {
    super(props);
    const daysArray = {};
    let personDictionary = {};
    for (var i in props.days) daysArray[i] = [props.days[i], 0];
    this.state = {
      days: props.days,
      personDictionary: personDictionary,
      daysArray: daysArray,
      Hours_Working: 0,
      name: ""
    };
    console.log(daysArray);
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
        <viewFunctions.DisplaySchedule
          days={this.state.days}
          people={this.state.personDictionary}
        />
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
                  <viewFunctions.IndividualDay
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
