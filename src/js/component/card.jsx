import React, { useState, useEffect } from "react";

//create your first component
const Card = () => {
  const [items, setItems] = useState([]);
  const [value, setValue] = useState('');
  const [loading, setLoading] = useState(false);

  const getData = () => {
    fetch('https://assets.breatheco.de/apis/fake/todos/user/gustavomm19', {
      method: "GET",
      // body: [],
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(resp => {
        console.log(resp.ok); // will be true if the response is successfull
        console.log(resp.status); // the status code = 200 or code = 400 etc.
        return resp.json(); // (returns promise) will try to parse the result as json as return a promise that you can .then for results
    })
    .then(data => {
        //here is were your code should start after the fetch finishes
        console.log(data); //this will print on the console the exact object received from the server
        setItems(data);
      })
    .catch(error => {
        //error handling
        console.log(error);
    });
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <div className="component-card">
      <div className="main-card text-secondary">
        <div className="card-row input-section">
          <input
            type="text"
            placeholder="What needs to be done?"
            className="text-secondary"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter' && value && value !== '') {
                setItems([...items, value]);
                setValue('');
              }
            }}
          />
        </div>
        {items.map((item, i) => (
          <div className="card-row input-section" key={`${i}-card-row`}>
            {item.label}
            <button
              className="close-button text-secondary"
              onClick={() => {
                let myArray = [...items]
                myArray.splice(i, 1)
                setItems(myArray);
              }}
            >
              X
            </button>
          </div>
        ))}
        {items.length === 0 && (
          <div className="card-row input-section">
            No tasks, add a task
          </div>
        )}
        <div className="footer">
          <small>{items.length} items left</small>
        </div>
      </div>
      <div className="extra-card extra-1" />
      <div className="extra-card extra-2" />
    </div>
  );
};

export default Card;