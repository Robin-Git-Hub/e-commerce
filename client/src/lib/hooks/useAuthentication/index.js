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

    async function handleUserLogout () {
        console.dir(app.currentUser);
        app.currentUser?.logOut()
        .then(console.log("user successfully log out"))
        .catch((err) => console.log(err));
    }

    async function handleUserLogin(email, password) {
        return new Promise((resolve => {
            app
            .logIn(Realm.Credentials.emailPassword(email, password))
            .then(async () => {
                //verify current user
                const currentUser = await app.currentUser;
                resolve(currentUser);
                dispatch(handleLogin(currentUser));
                //retireve user profile
                // getUser(currentUser.mail)
                    //.then(userProfile => {
                        // dispatch(handleLogin(userProfile))

                    // })
            })
        }))
    }

    async function handleAuthentication() {
        const currenUser = await app.currentUser;
        // getUser(currentUser?.email)
        // .then(userProfile => !!currentUser && dispatch(handleLogin(userProfile)))
        // .catch(err => dispatch(handleAuthenticationError(err)))
    }
    

    return {
        handleUserRegistration,
        handleUserLogout,
        handleAuthentication,
        handleUserLogin
    };
};
export default useAuthentication;