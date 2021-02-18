import { firebase, db } from "../database/config";

// define types

export const UPDATE_EMAIL = "UPDATE_EMAIL";
export const UPDATE_NAME = "UPDATE_NAME";
export const UPDATE_PASSWORD = "UPDATE_PASSWORD";
export const LOGIN = "LOGIN";
export const SIGNUP = "SIGNUP";

// actions

export const updateEmail = (email) => {
  return {
    type: UPDATE_EMAIL,
    payload: email,
  };
};

export const updateName = (name) => {
  return {
    type: UPDATE_NAME,
    payload: name,
  };
};

export const updatePassword = (password) => {
  return {
    type: UPDATE_PASSWORD,
    payload: password,
  };
};

export const login = () => {
  return async (dispatch, getState) => {
    try {
      const { email, password } = getState().user;
      const response = await firebase
        .auth()
        .signInWithEmailAndPassword(email, password);

      dispatch(getUser(response.user.uid));
    } catch (e) {
      alert(e);
    }
  };
};

export const getUser = (uid) => {
  return async (dispatch, getState) => {
    try {
      const user = await db.collection("users").doc(uid).get();

      dispatch({ type: LOGIN, payload: user.data() });
    } catch (e) {
      alert(e);
    }
  };
};

export const signup = () => {
  return async (dispatch, getState) => {
    try {
      const { email, password, name } = getState().user;
      const response = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);
      if (response.user.uid) {
        const user = {
          uid: response.user.uid,
          email: email,
          name: "Mario",
        };

        db.collection("users").doc(response.user.uid).set(user);
        alert("Su usuario se creó exitosamente");

        dispatch({ type: SIGNUP, payload: user });
      }
    } catch (e) {
      alert(e);
    }
  };
};
