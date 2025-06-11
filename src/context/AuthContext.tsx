"use client";
import { getPermissions, getUser } from "@/app/actions";
import LoadingComponent from "@/components/LoadingComponent";
import { GetPermissionsResponse, userProfile } from "@/types";
import React, { createContext, useContext, useEffect, useState } from "react";

type User = userProfile | null;

type AuthContextType = {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
  isLoading: boolean;
  isAdmin: boolean;
  permissions: GetPermissionsResponse | null;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [permissions, setPermissions] = useState<GetPermissionsResponse | null>(null);

  useEffect(() => {
    // Simulate an API call to fetch user profile
    const fetchUserProfile = async () => {
      try {
        // Replace with actual API call
        const [ responseUser, responsePermissions] = await Promise.all([
          getUser(),
          getPermissions()
        ])
        setUser(responseUser);
        setPermissions(responsePermissions.permissions);
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
    return <LoadingComponent />;
  }

  return (
    <AuthContext.Provider
      value={{ user, isLoading, setUser, isAdmin: user?.role === "admin", permissions }}
    >
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
