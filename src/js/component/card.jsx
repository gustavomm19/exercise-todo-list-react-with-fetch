import React, { useState, useEffect } from "react";

//create your first component
const Card = () => {
  const [items, setItems] = useState([]);
  const [value, setValue] = useState('');
  const [loading, setLoading] = useState(false);

  const getData = async () => {
    setLoading(true);
    try {
      const resp = await fetch('https://assets.breatheco.de/apis/fake/todos/user/gustavomm19', {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      });

      console.log(resp.ok); // will be true if the response is successfull
      console.log(resp.status); // the status code = 200 or code = 400 etc.
      const data = await resp.json(); // (returns promise) will try to parse the result as json as return a promise that you can .then for results

      //here is were your code should start after the fetch finishes
      console.log(data); //this will print on the console the exact object received from the server
      if (resp.ok) setItems(data);
      setLoading(false);
    } catch (e) {
      console.log(e);
      setLoading(false);
    }

  };

  const updateTasks = async (todos) => {
    try {
      const resp = await fetch('https://assets.breatheco.de/apis/fake/todos/user/gustavomm19', {
        method: "PUT",
        body: JSON.stringify(todos),
        headers: {
          "Content-Type": "application/json"
        }
      });

      console.log(resp.ok);
      console.log(resp.status);
      const data = await resp.json();
      
      console.log(data);
      return { ok: resp.ok, data, }
    } catch (e) {
      console.log(e);
    }
  };

  const deleteTasks = async () => {
    try {
      const resp = await fetch('https://assets.breatheco.de/apis/fake/todos/user/gustavomm19', {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        }
      });

      console.log(resp.ok);
      console.log(resp.status);
      const data = await resp.json();
      console.log(items);
      setItems([]);

      console.log(data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  if (loading) return <p>...Loading</p>
  return (
    <div className="component-card">
      <button
        id="delete-button"
        type="button" 
        class="btn btn-secondary position-absolute"
        style={{ right: '-150px' }}
        onClick={async () => {
          await deleteTasks();
        }}
      >
        Clear
      </button>
      <div className="main-card text-secondary">
        <div className="card-row input-section">
          <input
            type="text"
            placeholder="What needs to be done?"
            className="text-secondary"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={async (event) => {
              if (event.key === 'Enter' && value && value !== '') {
                const result = await updateTasks([...items, { label: value, done: false }]);
                if (result.ok) {
                  setItems([...items, { label: value, done: false }]);
                  setValue('');
                }
                else alert(`The value wasnt added: ${result.data.msg}`);
                console.log(`The value wasnt added: ${result.data.msg}`)
              }
            }}
          />
        </div>
        {items.map((item, i) => (
          <div className="card-row" key={`${i}-card-row`} style={{ display: !item.done ? 'flex' : 'none' }}>
            {item.label}
            <button
              className="close-button text-secondary"
              onClick={async () => {
                let myArray = [...items];
                myArray[i].done = true;
                await updateTasks(myArray);
                setItems(myArray);
              }}
            >
              X
            </button>
          </div>
        ))}
        {items.filter((elem) => !elem.done).length === 0 && (
          <div className="card-row input-section">
            No tasks, add a task
          </div>
        )}
        <div className="footer">
          <small>{items.filter((elem) => !elem.done).length} items left</small>
        </div>
      </div>
      <div className="extra-card extra-1" />
      <div className="extra-card extra-2" />
    </div>
  );
};

export default Card;