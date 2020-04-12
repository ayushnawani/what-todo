import React, { ChangeEvent, useState } from 'react';
import logo from './logo.svg';
import './App.css';

const dataSet: {
  [key: string]: Array<{
    name: string;
    description: string;
    level: number;
    img: string;
  }>;
} = {
  exercise: [
    {
      name: 'Do 20 Pushups in 60 seconds',
      description: 'Do 20 Pushups in 10 seconds',
      level: 1,
      img: require('./assets/pushup.jpg'),
    },
    {
      name: 'Do Jogging for 5 mins non stop',
      description: 'Do Jogging for 5 mins non stop',
      level: 1,
      img: require('./assets/jogging.png'),
    },
    {
      name: 'Do 5 Chin-Ups',
      description: 'Do 5 ChinUps',
      level: 1,
      img: require('./assets/chinup.jpg'),
    },
  ],
  cooking: [
    {
      name: 'Cook Panner in 30 mins',
      description: 'Do 20 Pushups in 60 seconds',
      level: 1,
      img: require('./assets/paneer.jpg'),
    },
    {
      name: 'Cook Pasta in 20 mins',
      description: 'Do 20 Pushups in 10 seconds',
      level: 1,
      img: require('./assets/pasta.jpeg'),
    },
    {
      name: 'Make a Pizza',
      description: 'Do 20 Pushups in 10 seconds',
      level: 1,
      img: require('./assets/pizza.jpg'),
    },
    {
      name: 'Make a Burger',
      description: 'Do 20 Pushups in 10 seconds',
      level: 1,
      img: require('./assets/burger.jpg'),
    },
    {
      name: 'Make Fruit Salad',
      description: 'Do 20 Pushups in 10 seconds',
      level: 1,
      img: require('./assets/fruitsalad.jpg'),
    },
    {
      name: 'Make dalgona coffee',
      description: 'Do 20 Pushups in 10 seconds',
      level: 1,
      img: require('./assets/coffee.jpg'),
    },
  ],
};

function randomNumber(max: number, min = 0) {
  return Math.floor(Math.random() * (max - min) + min);
}

function App() {
  const [todo, setTodo] = useState<{
    name: string;
    description: string;
    level: number;
    img: string;
  }>({
    name:
      'Feeling Bored? Select your category and click "Get my random activity"',
    description: '',
    level: 1,
    img: require('./assets/bored.jpg'),
  });

  function handleSubmit(event: ChangeEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.target);
    console.log('handleSubmit -> data', data.entries());
    const todoSet = [];
    for (let [key] of data.entries()) {
      const list = dataSet[key];
      todoSet.push(...list);
    }

    if (todoSet.length > 0) {
      const index = randomNumber(todoSet.length);
      console.log('handleSubmit -> index', index);
      const matched = todoSet[index];
      console.log('handleSubmit -> matched', matched);
      // if (matched) {
      setTodo(matched);
      // }
    }
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <h1>What To do?</h1>
        </div>
      </div>
      {/* How to write select */}
      {/* <select id="files" value="4">
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
      </select> */}

      <form onSubmit={handleSubmit}>
        {[
          { name: 'cooking', label: 'Cooking' },
          { name: 'exercise', label: 'Exercise' },
        ].map(({ name, label }) => (
          <div className="form-group form-check">
            <input
              className="form-check-input"
              type="checkbox"
              name={name}
              defaultChecked
            />
            <label className="form-check-label">{label}</label>
          </div>
        ))}

        <button className="btn btn-primary" type="submit">
          Get my random activity
        </button>
      </form>
      <div className="row activity">
        <div className="col">
          <h4>{todo.name}</h4>
          <img
            className="img-thumbnail activity-img"
            src={todo.img}
            alt="img"
          />
        </div>
      </div>
    </div>
  );
}

export default App;
