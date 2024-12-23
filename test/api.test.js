const request = require('supertest');
const fs = require('fs');
const app = require('../server'); // Import Express app

const DATA_FILE = './todos.json';

// Helper function to reset data file before each test
const resetDataFile = () => {
  fs.writeFileSync(DATA_FILE, JSON.stringify([]));
};

describe('Todo API Tests', () => {
  let expect;

  before(async () => {
    // Dynamically import Chai
    expect = (await import('chai')).expect;
  });

  beforeEach(() => {
    resetDataFile();
  });

  // Test: Get all todos (initial state should be empty)
  it('should get all todos', async () => {
    const response = await request(app).get('/api/todos');
    expect(response.status).to.equal(200);
    expect(response.body).to.be.an('array').that.is.empty;
  });

  // Test: Add a new todo
  it('should add a new todo', async () => {
    const newTodo = { text: 'Learn testing' };
    const response = await request(app)
      .post('/api/todos')
      .send(newTodo)
      .set('Content-Type', 'application/json');

    expect(response.status).to.equal(201);
    expect(response.body).to.include(newTodo);
    expect(response.body).to.have.property('id');
  });

  // Test: Add duplicate todo (should not allow)
  it('should not add duplicate todo', async () => {
    const newTodo = { text: 'Learn testing' };
    await request(app).post('/api/todos').send(newTodo).set('Content-Type', 'application/json');
    const response = await request(app)
      .post('/api/todos')
      .send(newTodo)
      .set('Content-Type', 'application/json');

    expect(response.status).to.equal(400);
    expect(response.body).to.have.property('error').that.equals('Todo already exists');
  });

  // Test: Update a non-existing todo
  it('should return 404 when updating a non-existing todo', async () => {
    const response = await request(app)
      .put('/api/todos/999') // Non-existing ID
      .send({ completed: true });

    expect(response.status).to.equal(404); // Expecting 404
    expect(response.body).to.have.property('error', 'Todo not found');
  });

  // Test: Update a todo
  it('should update a todo', async () => {
    const newTodo = { text: 'Learn testing' };
    const addedTodo = await request(app)
      .post('/api/todos')
      .send(newTodo)
      .set('Content-Type', 'application/json');

    const updatedTodo = { text: 'Learn advanced testing' };
    const response = await request(app)
      .put(`/api/todos/${addedTodo.body.id}`)
      .send(updatedTodo)
      .set('Content-Type', 'application/json');

    expect(response.status).to.equal(200);
    expect(response.body).to.have.property('message').that.equals('Todo updated');
    expect(response.body.todo).to.have.property('text', 'Learn advanced testing');
    expect(response.body.todo.completed).to.equal(false);
  });
  
  // Test: Deleting a non-existing todo
  it('should return 404 when deleting a non-existing todo', async () => {
    const response = await request(app)
      .delete('/api/todos/999'); // Non-existing ID

    expect(response.status).to.equal(404); // Expecting 404
    expect(response.body).to.have.property('error', 'Todo not found');
  });

  // Test: Delete a todo
  it('should delete a todo', async () => {
    const newTodo = { text: 'Learn testing' };
    const addedTodo = await request(app)
      .post('/api/todos')
      .send(newTodo)
      .set('Content-Type', 'application/json');

    const response = await request(app).delete(`/api/todos/${addedTodo.body.id}`);
    expect(response.status).to.equal(200);
    expect(response.body).to.have.property('message').that.equals('Todo deleted');
  });
   

});
