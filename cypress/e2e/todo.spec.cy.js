const PORT = 3000;

describe('Todo App E2E Tests', () => {
  before(() => {
    cy.task('clearDatabase');
});


describe('Todo List End-to-End Tests', () => {
  it('should display "Todo List" text', () => {
    cy.visit(`http://localhost:${PORT}`);
    cy.contains('h1', 'Todo List').should('be.visible');
  });

  it('should have a todo input form', () => {
    cy.visit(`http://localhost:${PORT}`);
    cy.get('#todo-form').should('exist');
  });

  it('should add a new todo', () => {
    cy.visit(`http://localhost:${PORT}`); 
    cy.get('input').type('Learn Cypress');
    cy.get('button').contains('Add').click();
    cy.contains('Learn Cypress').should('exist');
  });

  it('should delete a todo', () => {
    cy.visit(`http://localhost:${PORT}`);
    cy.get('input').type('Learn Cypress');
    cy.get('button').contains('Add').click();
    cy.contains('Learn Cypress');
    cy.get('button[onclick^="deleteTodo"]').contains('Delete').click();
    cy.contains('Learn Cypress').should('not.exist');
  });

  it('should mark a todo as completed', () => {
    cy.visit(`http://localhost:${PORT}`);
    cy.get('input').type('Complete Todo');
    cy.get('button').contains('Add').click();
    cy.contains('Complete Todo').should('exist');
    cy.contains('Complete Todo').get('button').contains('Complete').click();
    cy.get('li.todo-item').should('have.class', 'completed');
  });

  it('should be able to undo a completed  todo', () => {
    cy.visit(`http://localhost:${PORT}`);
    cy.get('input').type('Fry Potatoes');
    cy.get('button').contains('Add').click();
    cy.contains('Fry Potatoes').should('exist');
    cy.contains('Fry Potatoes').get('button').contains('Complete').click();
    cy.get('li.todo-item').should('have.class', 'completed');
    cy.contains('Fry Potatoes').get('button').contains('Undo').click();
    cy.contains('Fry Potatoes').should('exist');
  });

  it('should be able to modify an existing todo', () => {
    cy.visit(`http://localhost:${PORT}`);
    cy.get('input').type('Go Swimming Today');
    cy.get('button').contains('Add').click();
    cy.contains('Go Swimming Today').should('exist');
    cy.get('span[contenteditable="true"]').contains('Go Swimming Today').type('{backspace}{backspace}{backspace}{backspace}{backspace}');
    cy.get('span[contenteditable="true"]').contains('Go Swimming').type('Tomorrow')
    cy.contains('Go Swimming Tomorrow').should('exist');
    cy.get('#app').click();
  });
 });
});

