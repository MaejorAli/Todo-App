document.addEventListener('DOMContentLoaded', () => {
  const todoForm = document.getElementById('todo-form');
  const todoInput = document.getElementById('todo-input');
  const todoList = document.getElementById('todo-list');

  let editingId = null; // Keep track of the todo being edited

  // Fetch todos from the server
  const fetchTodos = async () => {
    const response = await fetch('/api/todos');
    const todos = await response.json();
    renderTodos(todos);
  };

  // Render todos
  const renderTodos = (todos) => {
    todoList.innerHTML = '';
    todos.forEach(todo => {
      const li = document.createElement('li');
      li.className = `todo-item ${todo.completed ? 'completed' : ''}`;
      li.innerHTML = `
        <span contenteditable="${!todo.completed}" 
              oninput="updateTodoText(${todo.id}, this.innerText)">
          ${todo.text}
        </span>
        <div>
          <button onclick="toggleComplete(${todo.id}, ${!todo.completed})">
            ${todo.completed ? 'Undo' : 'Complete'}
          </button>
          <button onclick="deleteTodo(${todo.id})">Delete</button>
        </div>
      `;
      todoList.appendChild(li);
    });
  };

  // Add or update todo
  todoForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const text = todoInput.value.trim();
    if (!text) return;

    try {
      if (editingId) {
        // Update existing todo
        const response = await fetch(`/api/todos/${editingId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text }),
        });

        if (!response.ok) {
          const error = await response.json();
          alert(error.error);
          return;
        }
        editingId = null; // Reset editing state
      } else {
        // Add new todo
        const response = await fetch('/api/todos', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text }),
        });

        if (!response.ok) {
          const error = await response.json();
          alert(error.error);
          return;
        }
      }

      todoInput.value = '';
      fetchTodos();
    } catch (err) {
      console.error('Error saving todo:', err);
    }
  });

  // Toggle complete
  window.toggleComplete = async (id, completed) => {
    try {
      // Fetch the current todo
      const response = await fetch(`/api/todos`);
      const todos = await response.json();
      const todo = todos.find(todo => todo.id === id);
  
      if (!todo) {
        console.error(`Todo with id ${id} not found`);
        return;
      }
  
      // Send the updated todo
      await fetch(`/api/todos/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: todo.text, completed }), // Include text in the request
      });
  
      fetchTodos(); // Refresh the todo list
    } catch (err) {
      console.error('Error toggling complete status:', err);
    }
  };
  

  // Delete todo
  window.deleteTodo = async (id) => {
    await fetch(`/api/todos/${id}`, { method: 'DELETE' });
    fetchTodos();
  };

  // Update todo text directly
  window.updateTodoText = async (id, newText) => {
    try {
      if (!newText.trim()) {
        alert('Todo text cannot be empty');
        fetchTodos(); // Re-fetch to reset the text
        return;
      }

      await fetch(`/api/todos/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: newText.trim(), completed: false }),
      });
    } catch (err) {
      console.error('Error updating todo text:', err);
    }
  };

  // Initial fetch
  fetchTodos();
});

