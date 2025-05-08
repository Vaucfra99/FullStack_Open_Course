import { useState } from "react";

const Header = ({ text }) => {
  return <h1>{text}</h1>;
};

const Button = ({ text, onclick }) => {
  return <button onClick={onclick}>{text}</button>;
};

const Statistics = ({ all, good, bad, neutral }) => {
  if (all === 0) {
    return "No feedback given yet";
  }
  const average = (good * 1 + neutral * 0 + bad * -1) / all;
  const positive = (good / all) * 100 + "%";
  return (
    <table>
      <tbody>
        <StatisticsLine text="good" value={good} />
        <StatisticsLine text="neutral" value={neutral} />
        <StatisticsLine text="bad" value={bad} />
        <StatisticsLine text="all" value={all} />
        <StatisticsLine text="average" value={average} />
        <StatisticsLine text="positive" value={positive} />
      </tbody>
    </table>
  );
};

const StatisticsLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
};

const App = () => {
  //Set constant parameters
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const all = good + bad + neutral;

  const addGood = () => {
    setGood(good + 1);
  };

  const addNeutral = () => {
    setNeutral(neutral + 1);
  };

  const addBad = () => {
    setBad(bad + 1);
  };

  return (
    <div>
      <Header text="give feedback" />
      <Button text="good" onclick={addGood} />
      <Button text="neutral" onclick={addNeutral} />
      <Button text="bad" onclick={addBad} />
      <Header text="statistics" />
      <Statistics all={all} good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;
