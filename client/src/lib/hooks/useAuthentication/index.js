import * as Realm from "realm-web";
import { app }from '../../service/mongoDB-sdk'

const useAuthentication = (dispatch) => {
    function handleUserRegistration(newUser) {
        return new Promise((resolve) => {
            app.emailPasswordAuth
            .registerUser(newUser.email, newUser.password)
            .then(() => {
                const credentials = Realm.Credentials.emailPassword(
                    newUser.email,
                    newUser.password
                );
                resolve();
                 app.logIn(credentials).then((user) => console.log(user));
            });
        });
    }
    return {
        handleUserRegistration,
    };
};
export default useAuthentication;