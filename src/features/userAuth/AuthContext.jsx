import { createContext, useEffect, useState, useContext } from "react";
import { supabase } from "../../services/supabase";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [session, setSession] = useState(undefined);
  console.log(session);

  //signUp
  const signUpNewUser = async (username, email, password) => {
    console.log("signUpNewUser called with:", { username, email, password });
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { username } },
    });
    console.log("signUpNewUser response:", { data, error });
    return { data, error };
  };

  //signIn
  const signInUser = async (email, password) => {
    console.log("AuthContext.signInUser received:", email, password);
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    return { data, error };
  };

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  // signOut
  const signOutUser = async function () {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.log(error);
      return error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        session,
        signUpNewUser,
        signInUser,
        signOutUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export function useAuth() {
  return useContext(AuthContext);
}
