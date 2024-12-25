import './style.css'

class TodoList {
  constructor() {
    this.todos = JSON.parse(localStorage.getItem('todos')) || [];
    this.form = document.getElementById('todo-form');
    this.input = document.getElementById('todo-input');
    this.list = document.getElementById('todo-list');
    
    this.initialize();
  }

  initialize() {
    this.form.addEventListener('submit', (e) => {
      e.preventDefault();
      this.addTodo();
    });

    this.renderTodos();
  }

  saveTodos() {
    localStorage.setItem('todos', JSON.stringify(this.todos));
  }

  addTodo() {
    const text = this.input.value.trim();
    if (text) {
      const todo = {
        id: Date.now(),
        text,
        completed: false
      };
      
      this.todos.push(todo);
      this.saveTodos();
      this.renderTodos();
      this.input.value = '';
    }
  }

  toggleTodo(id) {
    this.todos = this.todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    this.saveTodos();
    this.renderTodos();
  }

  deleteTodo(id) {
    this.todos = this.todos.filter(todo => todo.id !== id);
    this.saveTodos();
    this.renderTodos();
  }

  renderTodos() {
    this.list.innerHTML = '';
    
    this.todos.forEach(todo => {
      const li = document.createElement('li');
      li.className = `todo-item ${todo.completed ? 'completed' : ''}`;
      
      li.innerHTML = `
        <span class="todo-text">${todo.text}</span>
        <button class="toggle-btn" onclick="todoList.toggleTodo(${todo.id})">
          ${todo.completed ? 'Undo' : 'Complete'}
        </button>
        <button class="delete-btn" onclick="todoList.deleteTodo(${todo.id})">
          Delete
        </button>
      `;
      
      this.list.appendChild(li);
    });
  }
}

// Initialize the todo list and make it globally available
window.todoList = new TodoList();