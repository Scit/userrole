import idProviderService from '../idProviderService';
import fixtures from './fixtures.json';

export default class RestService {
    constructor() {
        this.users = fixtures.users;
        this.roles = fixtures.roles;

        idProviderService.init(this.users);
    }

    async getUserList() {
        return await Promise.resolve(this.users.concat());
    }

    async getRoleList() {
        return await Promise.resolve(this.roles.concat());
    }

    async createUser(userName, userRoles) {
        const id = idProviderService.getNextId();
        const data = {
            id,
            userName,
            userRoles
        };

        this.users.push(data);
        return await Promise.resolve(data);
    }

    async alterUser(id, userName, userRoles) {
        const index = this._getUserIndexById(id);
        const data = {
            id,
            userName,
            userRoles
        };
        this.users[index] = data;
        return await Promise.resolve(data);
    }

    async deleteUser(id) {
        const index = this._getUserIndexById(id);
        this.users.splice(index, 1);
        return await Promise.resolve({});
    }

    _getUserIndexById(id) {
        return this.users.findIndex((user) => user.userId === id);
    }
}