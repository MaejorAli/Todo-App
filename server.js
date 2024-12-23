const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;
const DATA_FILE = './todos.json';

// Middleware
app.use(bodyParser.json());
app.use(express.static('public'));

// Utility function to read JSON
const readTodos = () => {
  if (!fs.existsSync(DATA_FILE)) {
    return [];
  }
  return JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
};
// Utility function to write JSON
const writeTodos = (todos) => fs.writeFileSync(DATA_FILE, JSON.stringify(todos, null, 2), 'utf-8');

// Routes

// Get all todos
app.get('/api/todos', (req, res) => {
    const todos = readTodos();
    res.json(todos);
});

// Add a new todo
app.post('/api/todos', (req, res) => {
  const todos = readTodos();
  const { text } = req.body;

  // Check for duplicate text (case-insensitive)
  const isDuplicate = todos.some(todo => todo.text.toLowerCase() === text.toLowerCase());

  if (isDuplicate) {
      return res.status(400).json({ error: 'Todo already exists' });
  }

  const newTodo = { id: Date.now(), text, completed: false };
  todos.push(newTodo);
  writeTodos(todos);

  res.status(201).json(newTodo);
});

// Update a todo
app.put('/api/todos/:id', (req, res) => {
  const todos = readTodos();
  const id = parseInt(req.params.id);
  
  // Check if the todo with the provided ID exists
  const todoIndex = todos.findIndex(todo => todo.id === id);
  
  if (todoIndex === -1) {
    return res.status(404).json({ error: 'Todo not found' });
  }
  
  // Update the todo
  const updatedTodo = {
    ...todos[todoIndex],
    text: req.body.text !== undefined ? req.body.text : todos[todoIndex].text, // Preserve existing text if not provided
    completed: req.body.completed !== undefined ? req.body.completed : todos[todoIndex].completed,
  };
  
  todos[todoIndex] = updatedTodo;
  
  try {
    writeTodos(todos);
    res.json({ message: 'Todo updated', todo: updatedTodo });
  } catch (err) {
    res.status(500).json({ error: 'Failed to save updated todos' });
  }
});


// Delete a todo
app.delete('/api/todos/:id', (req, res) => {
  const todos = readTodos();
  const id = parseInt(req.params.id);
  
  // Check if the todo with the provided ID exists
  const todoIndex = todos.findIndex(todo => todo.id === id);
  
  if (todoIndex === -1) {
    return res.status(404).json({ error: 'Todo not found' });
  }

  // Delete the todo
  todos.splice(todoIndex, 1);
  
  writeTodos(todos);
  res.json({ message: 'Todo deleted' });
});

// Start server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

module.exports = app;

