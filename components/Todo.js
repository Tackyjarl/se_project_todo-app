class Todo {
  constructor(data, selector, handleCheck, handleTodoDelete) {
    this._data = data;
    this._templateElement = document.querySelector(selector);
    this._handleCheck = handleCheck;
    this._handleTodoDelete = handleTodoDelete;
  }

  _createCheckboxEl() {
    this._todoCheckboxEl = this._todoElement.querySelector(".todo__completed");
    this._todoLabel = this._todoElement.querySelector(".todo__label");
    this._todoCheckboxEl.checked = this._data.completed;
    this._todoCheckboxEl.id = `todo-${this._data.id}`;
    this._todoLabel.setAttribute("for", `todo-${this._data.id}`);
  }

  _setEventListeners() {
    this._todoCheckboxEl.addEventListener("change", () => {
      this._data.completed = !this._data.completed;
      this._handleCheck(this._todoCheckboxEl.checked);
    });
    this._todoDeleteBtn.addEventListener("click", () => {
      this._todoElement.remove();
      this._handleTodoDelete(this._data.completed);
    });
  }

  _createDueDateEl() {
    this._data.dueDate = new Date(this._data.date);
    if (!isNaN(this._data.dueDate)) {
      this._todoDate.textContent = `Due: ${this._data.dueDate.toLocaleString(
        "en-US",
        {
          year: "numeric",
          month: "short",
          day: "numeric",
        }
      )}`;
    }
  }

  getView() {
    this._todoElement = this._templateElement.content
      .querySelector(".todo")
      .cloneNode(true);
    const todoNameEl = this._todoElement.querySelector(".todo__name");

    this._todoDate = this._todoElement.querySelector(".todo__date");
    this._todoDeleteBtn = this._todoElement.querySelector(".todo__delete-btn");

    todoNameEl.textContent = this._data.name;

    this._createCheckboxEl();
    this._setEventListeners();
    this._createDueDateEl();
    return this._todoElement;
  }
}

export default Todo;
