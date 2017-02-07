import * as angular from 'angular';

export function AuthService($q, $http, UserInfoService) {
  return {
    login(credentials) {
      const encodedCredentials = {
        username: credentials.username,
        password: angular.copy(btoa(credentials.password))
      };
      return $http.put('/sessions', encodedCredentials).then(function(response) {
        UserInfoService.getUserInfo();
        return response;
      }).catch(function(error) {
        UserInfoService.clearUserInfo();
        return $q.reject(error);
      });
    },

    isAuthenticated() {
      return $http.get('/sessions', {cache: false}).then(function(response) {
        UserInfoService.getUserInfo();
        return response;
      }).catch(function(error) {
        UserInfoService.clearUserInfo();
        return $q.reject(error);
      });
    },

    changePassword(oldPassword, newPassword) {
      const method = 'ChangeUserPassword';
      const params = { oldPassword, newPassword };
      return $http.post('/json-rpc/2.0', { method, params })
      .then( response => {
        if (response.data && response.data.error) {
          return $q.reject(response.data.error);
        }
        return response.data.result;
      })
      .catch( err => {
        if (err.data && err.data.error) {
          return $q.reject(err.data.error);
        }
        return $q.reject(err);
      });
    },

    logout() {
      return $http.delete('/sessions').then(function(response) {
        UserInfoService.clearUserInfo();
        return response;
      }).catch(function(error) {
        return $q.reject(error);
      });
    }
  };
}

AuthService.$inject = ['$q', '$http', 'UserInfoService'];
