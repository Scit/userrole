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
        const userId = idProviderService.getNextId();
        const data = {
            userId,
            userName,
            userRoles
        };

        this.users.push(data);
        return await Promise.resolve(data);
    }

    async changeUser(userId, userName, userRoles) {
        const index = this._getUserIndexById(userId);
        const data = {
            userId,
            userName,
            userRoles
        };
        this.users[index] = data;
        return await Promise.resolve(data);
    }

    async deleteUser(userId) {
        const index = this._getUserIndexById(userId);
        this.users.splice(index, 1);
        return await Promise.resolve({});
    }

    _getUserIndexById(userId) {
        return this.users.findIndex((user) => user.userId === userId);
    }
}