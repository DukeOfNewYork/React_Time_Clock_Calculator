import React from "react";

const functionalFunctions = require("./functional.js");
const importSchedule = require("./schedule");

function DisplaySchedule(props) {
  let people = props.people;
  const days = props.days;
  let displayPeople = {};

  let hoursTogether = { combinedSchedule: [] };
  for (let person in people) {
    displayPeople[person] = new importSchedule.Schedule(people[person]);
    hoursTogether.combinedSchedule = displayPeople[person].combinedSchedule.map(
      (day, index) =>
        functionalFunctions.returnIfTrue(
          functionalFunctions.isNumber(hoursTogether.combinedSchedule[index]),
          day + hoursTogether.combinedSchedule[index],
          day
        )
    );
  }
  displayPeople["Combind Schedule"] = hoursTogether;

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
        {Object.entries(days).map(function(day, i) {
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

exports.DisplaySchedule = DisplaySchedule;
exports.InputForm = InputForm;
exports.IndividualDay = IndividualDay;
