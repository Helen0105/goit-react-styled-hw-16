import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [feedback, setFeedback] = useState({
    good: 0,
    neutral: 0,
    bad: 0,
  });

useEffect (() => {
  document.title = 'expresso feedback'
}, [])

  // const handleGoodClick = () => {
  //   setFeedback({
  //     ...feedback,
  //     good: feedback.good + 1,
  //   });
  // }; ///

  // const handleNeutralClick = () => {
  //   setFeedback({
  //     ...feedback,
  //     neutral: feedback.neutral + 1,
  //   });
  // };

  // const handleBadClick = () => {
  //   setFeedback({
  //     ...feedback,
  //     bad: feedback.bad + 1,
  //   });
  // };

  const countTotalFeedback = () => {
    return feedback.good + feedback.neutral + feedback.bad;
  };

  const countPositiveFeedbackPercentage = () => {
    if (countTotalFeedback() === 0) {
      return 0;
    } 

    return (feedback.good / countTotalFeedback()) * 100;
  };


const handleLeaveFeedback = (option) => {
  setFeedback({
    ...feedback,
    [option]: feedback[option] + 1,
  })
}




const options = ['good', 'neutral', 'bad']




  return (
    <>
      <h1> Відгуки</h1>

      <Section title="please leave feedback">
        <FeedbackOptions
          // onGood={handleGoodClick}
          // onNeutral={handleNeutralClick}
          // onBad={handleBadClick}

          options={options}
          onLeaveFeedback={handleLeaveFeedback}
        />
      </Section>

      {countTotalFeedback() === 0 ? (
        <Notification message="There is no feedback" />
      ) : (
        <Section title="Статистика">
          <Statistics
            good={feedback.good}
            neutral={feedback.neutral}
            bad={feedback.bad}
            total={countTotalFeedback()}
            positivePercentage={countPositiveFeedbackPercentage()}
          />
        </Section>
      )}
    </>
  );
}

function FeedbackOptions({ options, onLeaveFeedback }) {
  return (
    <div>
      {options.map(option => (
        <button key={option} onClick={() => onLeaveFeedback(option)}>
          {option}
        </button>
      ))}
    </div>
  );
}
function Statistics(props) {
  return (
    <div>
      <p>Good: {props.good}</p>
      <p>Neutral: {props.neutral}</p>
      <p>Bad: {props.bad}</p>
      <p>Total: {props.total}</p>
      <p>Positive percentage: {props.positivePercentage}</p>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <section>
      <h2>{title}</h2>
      {children}
    </section>
  );
}
function Notification({ message }) {
  return <p>{message}</p>;
}

export default App;
