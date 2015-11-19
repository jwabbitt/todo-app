angular
  .module('TodosController', [
    'dgmTodo.auth'
  ])
  .controller('TodosController', [
    'auth',
    '$location',
    function(auth, $location) {

      auth.isLoggedIn().then(function(isLoggedIn) {
        if (!isLoggedIn) {
          $location.url('/login');
        }
      });
    }
  ]);
