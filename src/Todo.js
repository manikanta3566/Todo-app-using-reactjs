import React, { useState, useEffect } from "react";

const getLocalStorageItems = () => {
  const lists = localStorage.getItem("todoItems");
  if (!lists) {
     return []
  } else {
    return JSON.parse(lists);;
  }
};

const Todo = () => {
  const [inputData, setInputData] = useState("");
  const [items, setItems] = useState(getLocalStorageItems());
  const [toggle, setToggle] = useState(false);
  const [editedIndex, setEditedIndex] = useState("");

  useEffect(() => {
    localStorage.setItem("todoItems", JSON.stringify(items));
  }, [items]);

  const addItems = () => {
    if (!inputData) {
      alert("please fill the data");
    } else if (toggle && inputData) {
       const updatedItems= items.map((ele)=>{
        if(ele.id===editedIndex){
            ele.item=inputData;
            return ele;
        }else{
            return ele;
        }
        })
        setItems(updatedItems);
        setToggle(false);
        setEditedIndex("");
        setInputData("");
    } else {
      const newItem = {
        id: new Date().getTime().toString(),
        item: inputData,
      };
      setItems([...items, newItem]);
      setInputData("");
    }
  };
  const deleteItem = (id) => {
    const updatedItems = items.filter((ele) => {
      return ele.id !== id;
    });
    setItems(updatedItems);
  };

  const editItem = (id) => {
    const edited_item = items.find((ele) => {
      return ele.id === id;
    });
    setInputData(edited_item.item);
    setToggle(true);
    setEditedIndex(id);
  };
  return (
    <>
      <h1 className="heading">Todo App</h1>
      <div>
        <input
          type="text"
          onChange={(e) => {
            setInputData(e.target.value);
          }}
          value={inputData}
          placeholder="Enter the items"
        />
        {toggle ? (
          <button
            className="btn"
            onClick={() => {
              addItems();
            }}
          >
            Update
          </button>
        ) : (
          <button
            className="btn"
            onClick={() => {
              addItems();
            }}
          >
            Add
          </button>
        )}
        <button
          className="btn"
          onClick={() => {
            setItems([]);
          }}
        >
          Clear list
        </button>
      </div>
      <div className="container">
        {items.map((ele) => {
          return (
            <div className="card" key={ele.id}>
              <p>{ele.item}</p>
              <button
                className="card-btn"
                onClick={() => {
                  editItem(ele.id);
                }}
              >
                Edit
              </button>
              <button
                className="card-btn"
                onClick={() => {
                  deleteItem(ele.id);
                }}
              >
                Delete
              </button>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Todo;
