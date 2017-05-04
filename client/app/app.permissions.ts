import * as _ from 'lodash';

export class PermissionError {}

export function AppPermissions($q, PermPermissionStore, UserInfoService) {
  const permissions = [ 'root', 'internalAdmin', 'internalUser', 'customerUser', 'registerCluster' ];

  permissions.forEach( perm => {
    PermPermissionStore.definePermission(
      perm,
      () => UserInfoService.getUserInfo()
        .then( () => {
          // TODO: When permissions are fixed in the backend, remove special handling for root
          const userIsRoot = _(UserInfoService.currentUser.permissions).includes('root');
          const userHasPerm = userIsRoot || _(UserInfoService.currentUser.permissions).includes(perm);
          if ( !userHasPerm ) {
            return $q.reject(new PermissionError());
          }
        })
    );
  });
}

AppPermissions.$inject = [ '$q', 'PermPermissionStore', 'UserInfoService' ];
