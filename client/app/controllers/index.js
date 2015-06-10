import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    createTodo() {
      var todo = {
        task: this.get('task'),
        isComplete: false
      };

      this.set('task', '');

      Ember.$.post('/api/v1/todo', todo)
        .then((newTodo) => {
          this.get('model').pushObject(newTodo);
        });
    },

    completeTodo(todo) {
      this.get('model').removeObject(todo);
      Ember.$.ajax({
        url: '/api/v1/todo',
        data: todo,
        method: 'DELETE'
      });
    }
  }
});
