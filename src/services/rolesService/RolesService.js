export default class RolesService {
    getRoleNames(allRoles, roleIdList) {
        const rolesMap = this._getRolesMap(allRoles);
        return roleIdList.map(roleId => rolesMap.get(roleId));
    }

    _getRolesMap(roleList) {
        return roleList.reduce((result, role) => {
            return result.set(role.roleId, role.roleName);
        }, new Map());
    }

}