import * as _ from 'lodash';

export class PermissionError {}

export function AppPermissions($q, PermPermissionStore, UserInfoService) {
  const permissions = [ 'root', 'internalAdmin', 'internalUser', 'customerUser' ];

  permissions.forEach( perm => {
    PermPermissionStore.definePermission(
      perm,
      () => UserInfoService.getUserInfo()
        .then( () => {
          const userHasPerm = _(UserInfoService.currentUser.permissions).includes(perm);
          if ( !userHasPerm ) {
            return $q.reject(new PermissionError());
          }
        })
    );
  });
}

AppPermissions.$inject = [ '$q', 'PermPermissionStore', 'UserInfoService' ];
