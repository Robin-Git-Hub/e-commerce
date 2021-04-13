import * as Realm from "realm-web";
import { app }from '../../service/mongoDB-sdk'
import { handleLogin, handleLogout, handleAuthErrors } from '../../state/actions/authentication'

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
                 app.logIn(credentials).then((user) => {
                    dispatch(handleLogin(newUser));
                    resolve(user);  
                 });
            })
            .catch((err) => dispatch(handleAuthErrors(err)));
        });
    }
    return {
        handleUserRegistration,
    };
};
export default useAuthentication;