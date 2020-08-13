export default class IdProviderService {
    init(users) {
        this.currentId = users && users.length ? this._getMaxId(users) : 0;
    }

    getNextId() {
        return ++this.currentId;
    }

    _getMaxId(users) {
        return users.reduce((result, user) => {
            const { userId } = user;
            return userId > result ? userId : result;
        }, users[0].userId);
    }
}