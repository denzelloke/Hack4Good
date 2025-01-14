import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { getClient } from "./database";
import { Session } from "@supabase/supabase-js";

interface AuthContextType {
  session: Session | null;
  loading: boolean;
  isAdmin: boolean;
  login: (username: string, password: string, role: "user" | "admin") => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const supabase = getClient();
  const [session, setSession] = useState<Session | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  // Fetch the user's role from the database
  const fetchUserRole = async (userId: string) => {
    const { data, error } = await supabase
      .from("customer") // Assuming 'users' table holds the is_admin field
      .select("is_admin")
      .eq("id", userId)
      .single();
    if (data) setIsAdmin(data.is_admin);
    if (error) throw new Error(error.message);
  };

  // Check for existing session and listen for auth changes
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session?.user?.id) fetchUserRole(session.user.id);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session?.user?.id) fetchUserRole(session.user.id);
    });

    return () => subscription?.unsubscribe();
  }, [supabase]);

  // Sign in function with username instead of email
  const login = async (username: string, password: string, role: "user" | "admin") => {
    // Query the customers table to get the uid associated with the username
    const { data: authUserData } = await supabase
      .from("customer") // The table that holds the username
      .select("email")
      .eq("username", username)
      .single();

    if (!authUserData?.email) {
      throw new Error("Failed to retrieve email for this user.");
    }

    // Sign in using the retrieved email
    const { error: signInError, data: signInData } = await supabase.auth.signInWithPassword({
      email: authUserData.email,
      password,
    });

    if (signInError) throw new Error(signInError.message);

    if (signInData?.user?.id) {
      await fetchUserRole(signInData.user.id); // Set user role
      if (role === "admin" && !isAdmin) {
        throw new Error("You do not have admin rights.");
      }
    } else {
      throw new Error("Sign-in failed.");
    }
  };

  // Logout function
  const logout = async () => {
    await supabase.auth.signOut();
    setSession(null);
    setIsAdmin(false);
  };

  return (
    <AuthContext.Provider value={{ session, loading, isAdmin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
