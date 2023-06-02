import { BehaviorSubject } from "rxjs";

const currentUser = new BehaviorSubject(null)

const authenticationService = {
    setUser(user) {
        currentUser.next(user);
    },

    logout() {
        currentUser.next(null);
    }
}

export {
    authenticationService,
    currentUser
}