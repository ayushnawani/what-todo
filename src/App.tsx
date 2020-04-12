import React, {
  ChangeEvent,
  useState,
  useEffect,
  FormEvent,
  MouseEvent,
} from 'react';

import Draggable, { DraggableEvent } from 'react-draggable';

import './App.css';

const meeseeksDataSet = [
  require('./assets/meeseeks_assist.png'),
  require('./assets/meeseeks_cooking.png'),
  require('./assets/meeseeks_dance.png'),
  require('./assets/meeseeks_gun.png'),
  require('./assets/meeseeks_service.png'),
];

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

    {
      name: 'Do 40 Pushups in 2 minutes',
      description: 'Do 20 Pushups in 10 seconds',
      level: 2,
      img: require('./assets/pushup.jpg'),
    },

    {
      name: 'Do 20 Chin-Ups',
      description: 'Do 20 ChinUps',
      level: 2,
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

    {
      name: 'Make a Pizza',
      description: 'Do 20 Pushups in 10 seconds',
      level: 2,
      img: require('./assets/pizza.jpg'),
    },
    {
      name: 'Make a Burger',
      description: 'Do 20 Pushups in 10 seconds',
      level: 2,
      img: require('./assets/burger.jpg'),
    },
  ],
};

function randomNumber(max: number, min = 0) {
  return Math.floor(Math.random() * (max - min) + min);
}

function randomXY() {
  const x = Math.floor(Math.random() * (window.innerWidth - 500));
  const y = Math.floor(Math.random() * (window.innerHeight - 500));

  console.log(window.innerWidth, window.innerHeight);
  console.log({ x, y });
  return { x, y };
}

function randomPostion() {
  const x = Math.floor(Math.random() * (window.innerWidth - 400));
  const y = Math.floor(Math.random() * (window.innerHeight - 400));

  console.log(window.innerWidth, window.innerHeight);
  console.log({ x, y });
  return { x, y };
}

function App() {
  const [todo, setTodo] = useState<{
    name: string;
    description: string;
    level: number;
    img: string;
  }>({
    name: 'Feeling Bored? click on "gimme some activity"',
    description: '',
    level: 1,
    img: require('./assets/bored.jpg'),
  });

  const [myLevel, setMyLevel] = useState(1);
  const [meeseeks, setMeeseeks] = useState<
    { img: string; position: { x: number; y: number } }[]
  >([]);

  const increaseLevel = (e: FormEvent) => {
    e.preventDefault();
    setMyLevel(myLevel + 1);
    localStorage.setItem('myLevel', (myLevel + 1).toString());
  };

  const decreaseLevel = (e: FormEvent) => {
    e.preventDefault();
    setMyLevel(myLevel - 1);
    localStorage.setItem('myLevel', (myLevel - 1).toString());
  };

  const addMeeseeks = (e: FormEvent) => {
    e.preventDefault();
    const pos = randomNumber(meeseeksDataSet.length, 0);
    const myMeeseeks = meeseeksDataSet[pos];
    setMeeseeks([...meeseeks, { img: myMeeseeks, position: randomXY() }]);
  };

  const removeMeeseeks = (index: number) => {
    const newMeeseeks = [...meeseeks.filter((_, ind) => ind !== index)];
    setMeeseeks(newMeeseeks);
  };

  useEffect(() => {
    const myLocalLevel = localStorage.getItem('myLevel');
    if (myLocalLevel) {
      setMyLevel(parseInt(myLocalLevel, 10));
      localStorage.setItem('myLevel', myLevel.toString());
    }
  }, []);

  function onDrag(e: DraggableEvent) {
    console.log(e);
  }

  function handleSubmit(event: ChangeEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.target);
    console.log('handleSubmit -> data', data.entries());
    const todoSet = [];
    for (let [key] of data.entries()) {
      const list = dataSet[key];
      todoSet.push(...list.filter(({ level }) => level === myLevel));
    }

    if (todoSet.length > 0) {
      let index = randomNumber(todoSet.length);
      console.log('handleSubmit -> index', index);
      const matched = todoSet[index];
      console.log('handleSubmit -> matched', matched);
      // if (matched) {
      setTodo(matched);
      // }
    }
  }

  return (
    <div className="container mt-2">
      <div className="row">
        <div className="col-md-9 col-sm-12">
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
            <label>What are you feeling to do?</label>
            {[
              { name: 'cooking', label: 'Cooking' },
              { name: 'exercise', label: 'Exercise' },
            ].map(({ name, label }) => (
              <div className="form-group form-check" key={name}>
                <input
                  className="form-check-input"
                  type="checkbox"
                  name={name}
                  defaultChecked
                />
                <label className="form-check-label">{label}</label>
              </div>
            ))}

            <div>
              <button className="btn btn-primary" type="submit">
                Gimme some activity
              </button>
              <button
                disabled={myLevel === 2}
                className="btn btn-success ml-3"
                onClick={increaseLevel}
              >
                Level me up
              </button>
              <button
                className="btn btn-danger ml-3"
                disabled={myLevel === 1}
                onClick={decreaseLevel}
              >
                Level me down
              </button>
              <h4 className="ml-2 mt-2 inline-block">
                You are at level {myLevel}
              </h4>
            </div>
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
        <div className="col-md-3 col-sm-12 mt-5">
          <h4> Whats New?</h4>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">Summon your Meeseeks</li>
            <li className="list-group-item">Level Up Yourself</li>
            <li className="list-group-item">
              Get activity based on your level
            </li>
          </ul>

          <h4 className="mt-5"> Coming Soon</h4>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">More categories to choose</li>
            <li className="list-group-item">More levels</li>
          </ul>
        </div>
      </div>

      <div className="fixed-bottom activity-assistant">
        <img
          className="btn"
          onClick={addMeeseeks}
          src={require('./assets/meeseeks_box.png')}
          alt="assistant"
        />
        <div>Summon your Meeseeks</div>
      </div>
      {meeseeks.map(({ img, position }, index) => {
        return (
          <Draggable
            key={index}
            // handle=".handle"
            position={position}
            // position={null}
            // grid={[25, 25]}
            // scale={1}
            // onStart={this.handleStart}
            onDrag={onDrag}
            // onStop={this.handleStop}
          >
            <div className="box">
              <h5 className="cross" onClick={() => removeMeeseeks(index)}>
                X
              </h5>
              <img
                className="btn meeseeks_assist"
                src={img}
                alt="meeseeks_assist"
              />
            </div>
          </Draggable>
        );
      })}
    </div>
  );
}

export default App;
