angular
  .module('TodosController', [
    'dgmTodo.auth',
    'dgmTodo.todos',
  ])
  .controller('TodosController', [
    'auth',
    '$location',
    'todos',
    function(auth, $location, todos) {
      'use strict';

      var self = this;
      self.errorMessage = '';

      auth.isLoggedIn().then(function (currentUser) {
        if (!currentUser) {
          $location.url('/login');
        } else {
          self.currentUser = currentUser;
          readTodos();
        }
      });

      function readTodos() {
        todos.read(self.currentUser.id)
          .then(function (todoItems){
            self.todos = todoItems;
          });
      }

      function resetCreateForm() {
        self.create = {
          name: '',
          description: '',
          tags: '',
        };
      }
      resetCreateForm();

      self.createTodo = function (data) {
        self.errorMessage = '';
        var todo = {
          name: data.name,
          description: data.description || '-No Description-',
          tags: (data.tags || '')
            .split(',')
            .map(function (tag) {
              return tag.trim();
            })
            .filter(function(tag) {
              return tag;
            })
        };

        todos.create(self.currentUser.id, todo)
          .then(function() {
            readTodos();
            resetCreateForm();
            console.log("Success!");
          })
          .catch(function(res) {
            console.log(res.data);
            self.errorMessage = res.data.message;
            //TODO error handle
          });
      };

    },
  ]);
