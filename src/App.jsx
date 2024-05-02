import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";

import { v4 as uuidv4 } from "uuid";

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    let todoString = localStorage.getItem("todos");
    if (todoString) {
      let todos = JSON.parse(localStorage.getItem("todos"));
      setTodos(todos);
    }
  }, []);

  const saveToLS = () => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  const handleChange = (e) => {
    setTodo(e.target.value);
    saveToLS();
  };
  const handleEdit = (e, id) => {
    let t = todos.filter((i) => i.id === id);
    setTodo(t[0].todo);
    handleDelete(e, id);
    saveToLS();
  };

  const handleDelete = (e, id) => {
    let newTodos = todos.filter((item) => item.id !== id);
    setTodos(newTodos);
    saveToLS();
  };

  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
    setTodo("");
    saveToLS();
  };

  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex((item) => {
      return item.id === id;
    });
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    saveToLS();
    setTodos(newTodos);
  };

  return (
    <>
      <Navbar />
      <div className="text-center">
        <div className="container mx-auto my-5 rounded-xl p-5 bg-yellow-100 min-h-[85vh]">
          <div className="addTodo my-5">
            <h2 className="text-lg font-bold">Add a Todo</h2>
            <input
              onChange={handleChange}
              value={todo}
              type="text"
              className="w-1/2 h-[40px] rounded-md border-[2px] border-black"
            />
            <button
              onClick={handleAdd}
              className="bg-yellow-500 hover:bg-yellow-600 run decoration-violet-5000 p-3 py-1 text-white rounded-lg mx-6 font-bold"
            >
              Add
            </button>
          </div>
          <h2 className="text-lg font-bold">Your Todos</h2>
          <div className="todos">
            {todos.length === 0 && (
              <div className="m-5 opacity-40 animate-bounce p-5">
                No Todos to show
              </div>
            )}
            {todos.map((item) => {
              return (
                <div
                  key={item.id}
                  className="todo flex align-content-center text-center justify-between w-1/2 mx-auto"
                >
                  <div className="flex gap-10 ">
                    <input
                      name={item.id}
                      onChange={handleCheckbox}
                      type="checkbox"
                      value={item.isCompleted}
                      // name=""
                      // id=""
                    />
                    <div
                      className={
                        item.isCompleted
                          ? "line-through m-3 cedarville-cursive-regular text-2xl"
                          : "m-3 cedarville-cursive-regular text-2xl"
                      }
                    >
                      {item.todo}
                    </div>
                  </div>

                  <div className="buttons my-auto flex h-full">
                    <button
                      onClick={(e) => handleEdit(e, item.id)}
                      className="bg-yellow-500 hover:bg-yellow-600 run decoration-violet-5000 p-3 py-1 text-white rounded-lg mx-1 font-bold"
                    >
                      Edit
                    </button>
                    <button
                      onClick={(e) => handleDelete(e, item.id)}
                      className="bg-yellow-500 hover:bg-yellow-600 run decoration-violet-5000 p-3 py-1 text-white rounded-lg mx-1 font-bold"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
