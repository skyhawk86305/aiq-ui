import * as angular from 'angular';
import * as _ from 'lodash';

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

    getSSOSession() {
      return $http.get('/sso/session', { cache: false });
    },

    linkSSO() {
      return $http.post('/sso/link');
    },

    changePassword(oldPassword, newPassword) {
      const method = 'ChangeUserPassword';
      const params = { oldPassword, newPassword };
      return $http.post('/json-rpc/2.0', { method, params })
      .then( response => {
        const error = _.get(response, 'data.error');
        if (error) {
          return $q.reject(error);
        }
        return _.get(response, 'data.result');
      })
      .catch( err => {
        return $q.reject(_.get(err, 'data.error', err));
      });
    },

    requestPasswordReset(email: string) {
      return $http.post('/password-reset', email, {
        headers: { 'Content-Type': 'text/plain' },
      });
    },

    setNewPassword(token: string, newPassword: string) {
      return $http.post(`/password-reset/${token}`, newPassword, {
        headers: { 'Content-Type': 'text/plain' },
      });
    },

    logout() {
      return $http.get('/sessions/logout', { cache: false })
        .then( response => {
          UserInfoService.clearUserInfo();
          return response;
        });
    },

    hasPermission(permission) {
      return UserInfoService.getUserInfo()
        .then(() => {
          return _(UserInfoService.currentUser.permissions).includes(permission) || _(UserInfoService.currentUser.permissions).includes('root')
        })
        .catch(() => {
          return false;
        });
    }
  };
}

AuthService.$inject = ['$q', '$http', 'UserInfoService'];
