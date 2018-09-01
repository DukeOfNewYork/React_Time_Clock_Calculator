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

function RowBuilder(props) {
  let person = props.person;
  return (
    <tr>
      {Object.entries(person).map(function(row, i) {
        return <td>{row[1]}</td>;
      }, this)}
    </tr>
  );
}
function DisplaySchedule() {
  let people = {
    Simon: { schedule: [0, 8, 8, 8, 0, 8, 0] },
    Steve: { schedule: [8, 8, 0, 0, 8, 8, 8] }
  };

  let displayPeople = {};

  for (let person in people) {
    displayPeople[person] = [person];
    for (let day in people[person].schedule) {
      displayPeople[person].push(people[person].schedule[day]);
    }
  }

  return (
    <table>
      <tbody>
        {Object.entries(displayPeople).map(function(person, i) {
          return <RowBuilder person={person[1]} />;
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
      // dayValues: daysArray,
      // rows: {},
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
    let newPersonDictionary = this.state.personDictionary;
    newPersonDictionary[this.state.name] = this.state.daysArray;
    console.log(this.state.personDictionary);
    console.log(this.state.daysArray);
    console.log(newPersonDictionary);
  }

  render() {
    return (
      <div>
        <InputForm
          personName={this.state.name}
          daysArray={this.state.daysArray}
          handleSubmit={this.handleSubmit.bind(this)}
          handleInputChange={this.handleInputChange.bind(this)}
        />
        <DisplaySchedule />
      </div>
    );
  }
}
function InputForm(props) {
  return (
    <form style={{ flex: 1 }} onSubmit={ev => props.handleSubmit(ev)}>
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
