import { useState } from 'react';

const Button = ({ onClick, text }) => {
  return <button onClick={onClick}>{text}</button>;
};

const Header = ({ text }) => {
  return <h1>{text}</h1>;
};

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.',
  ];

  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0));
  const mostVotes = maxVotes(votes);

  const handleAnecdote = () => {
    let index = Math.abs(Math.floor(Math.random() * anecdotes.length - 1));
    setSelected(index);
  };

  const handleVote = () => {
    const copy = [...votes];
    copy[selected] += 1;
    setVotes(copy);
  };

  function maxVotes(arr) {
    let max = 0;
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] > arr[max]) {
        max = i;
      }
    }
    return max;
  }

  return (
    <div>
      <Header text={'Anecdote of the day'} />
      <p>{anecdotes[selected]}</p>
      <p>has {votes[selected]} votes</p>
      <Button onClick={handleAnecdote} text={'Next anecdote'} />
      <Button onClick={handleVote} text={'Vote'} />
      <Header text={'Anecdote with most votes'} />
      <p>{anecdotes[mostVotes]}</p>
      <p>has {votes[mostVotes]} votes</p>
    </div>
  );
};

export default App;
