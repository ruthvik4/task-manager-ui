
import { useState, useEffect } from "react";
import {
  getTasks,
  createTasks,
  deleteTasks,
  updateTasks,
} from "./task_services/taskServices";


  function Tasks_manager(){



  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [editID, setEditableId] = useState();
const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);


const loadTasks = async () => {
    const res = await getTasks(page,size);
    setTasks(res.data.content);
  };
 useEffect(() => {
  const loadTasks = async () => {
    const res = await getTasks(page,size);
    setTasks(res.data.content);
  };
    loadTasks();
  }, [page,size]);

  const handleAdd = async () => {
    if (!title.trim()) return;
    await createTasks({ title, description, completed: false });
    setTitle("");
    setDescription("");
    loadTasks();
  };

  const handleDelete = async (id) => {
    await deleteTasks(id);
    loadTasks();
  };

  const handleUpdate = async (id) => {
    await updateTasks(id, { title, description, completed: false });
    loadTasks();
    setEditableId(null);
    setTitle("");
    setDescription("");
  };

  const handleTitleStatus = async (item) => {
    const update = { ...item, completed: !item.completed };
    await updateTasks(item.id, update);
    loadTasks();
  };

  return (
    <div className="app-container">
      <h1 className="app-title">✨ Task Manager</h1>

      <div className="task-input-container">
        <input
          className="input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Task title"
        />
        <input
          className="input"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Task description"
        />
        <button className="btn btn-primary" onClick={handleAdd}>
          Add Task
        </button>
      </div>

      <ul className="task-list">
        {tasks.map((item) => (
          <li key={item.id} className={`task-item ${item.completed ? "completed" : ""}`}>
            <div className="task-main">
              <input
                type="checkbox"
                checked={item.completed}
                onChange={() => handleTitleStatus(item)}
              />
              <div className="task-text">
                <h3>{item.title}</h3>
                {item.description && <p>{item.description}</p>}
              </div>
            </div>

            <div className="task-actions">
              {editID === item.id ? (
                <>
                  <input
                    className="input edit-input"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Edit title"
                  />
                  <button className="btn btn-success" onClick={() => handleUpdate(item.id)}>
                    Save
                  </button>
                </>
              ) : (
                <>
                  <button className="btn btn-warning" onClick={() => setEditableId(item.id)}>
                    Edit
                  </button>
                  <button className="btn btn-danger" onClick={() => handleDelete(item.id)}>
                    Delete
                  </button>
                </>
              )}
            </div>
          </li>
        ))}
      </ul>

      <button onClick={() => setPage( p => p + 1)}>
        Next
      </button>
        <button onClick={() => setPage( p => p -1)}>
        Previous
        </button>
    </div>
  );
}

  export default Tasks_manager;
