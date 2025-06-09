"use client";
import { getUser } from "@/app/actions";
import { userProfile } from "@/types";
import React, { createContext, useContext, useEffect, useState } from "react";

type User = userProfile | null;

type AuthContextType = {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
  isLoading: boolean;
  isAdmin: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Simulate an API call to fetch user profile
    const fetchUserProfile = async () => {
      try {
        // Replace with actual API call
        const response = await getUser();
        setUser(response);
      } catch (error) {
        console.error("Failed to fetch user profile", error);
        setIsLoading(false);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUserProfile();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, setUser, isAdmin : user?.role === "admin" }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
