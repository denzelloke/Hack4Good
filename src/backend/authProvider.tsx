import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { getClient } from "./supabase";
import { Session } from "@supabase/supabase-js";

interface AuthContextType {
  session: Session | null;
  loading: boolean;
  isAdmin: boolean;
  login: (
    username: string,
    password: string,
    isAdmin: boolean
  ) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const supabase = getClient();
  const [session, setSession] = useState<Session | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchUserRole = async (userId: string) => {
    const { data, error } = await supabase
      .from("users")
      .select("is_admin")
      .eq("id", userId)
      .single();
    if (data) setIsAdmin(data.is_admin);
    if (error) throw new Error(error.message);
  };

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

  const login = async (
    username: string,
    password: string,
    isAdmin: boolean
  ) => {
    console.log("logging in with", username, password, isAdmin);
    const { data: authUserData } = await supabase
      .from("users")
      .select("email")
      .eq("username", username)
      .eq("is_admin", isAdmin)
      .single();

    if (!authUserData?.email) {
      throw new Error("Failed to retrieve email for this user.");
    }
    console.log("Signing in with", authUserData.email, password);
    await supabase.auth.signInWithPassword({
      email: authUserData.email,
      password,
    });
  };

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

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
