import {
  refreshTokenRest,
  signInRest,
  signOutRest,
} from "@/lib/services/auth-service";
import { NextAuthOptions } from "next-auth";
import { JWT } from "next-auth/jwt";

import CredentialsProvider from "next-auth/providers/credentials";
import { ZodError } from "zod";
/**
 * Takes a token, and returns a new token with updated
 * `accessToken` and `accessTokenExpires`. If an error occurs,
 * returns the old token and an error property
 */
async function refreshAccessToken(token: JWT) {
  try {
    const resp = await refreshTokenRest(
      {
        refresh_token: token.refreshToken,
      },
      token.user.device_id
    );

    return {
      ...token,
      accessToken: resp.payload.data?.access_token ?? token.accessToken,
      accessTokenExpires: Date.now() + 3600000,
      refreshToken: resp.payload.data?.refresh_token ?? token.refreshToken,
    };
  } catch (error) {
    console.log(error);

    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}
const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        deviceId: { label: "Device ID", type: "text" },
        fullName: { label: "Full Name", type: "text" }, // Used for signup
        action: { label: "Action", type: "text" }, // 'login' or 'signup'
      },
      async authorize(credentials) {
        if (!credentials?.action) {
          throw new Error("Action is required");
        }

        try {
          if (credentials.action === "login") {
            if (!credentials.email || !credentials.password) {
              throw new Error("Email and password are required for login");
            }

            // const response = await authService.login({
            //   email: credentials.email as string,
            //   password: credentials.password as string,
            // });
            const response = await signInRest(
              {
                email: credentials.email as string,
                password: credentials.password,
              },
              credentials.deviceId as string
            );
            const data = response.payload.data; // SigninResponse

            if (response.status !== "success" || !data) {
              throw new Error(
                JSON.stringify({
                  message: response.message,
                  errors: response.payload.errors,
                })
              );
            }
            return {
              id: data.user.id,
              email: data.user.email,
              name: data.user.email,
              role: data.user.status,
              accessToken: data.access_token,
              refreshToken: data.refresh_token,
              // accessTokenExpires: Date.now() + 3600000,
              user: data.user,
            };
          } else {
            throw new Error("Invalid action");
          }
        } catch (error: any) {
          let message = "An unexpected error occurred";
          let errors: string[] = [];

          if (error instanceof ZodError) {
            message = "Validation Error";
            errors = error.issues.map((e) => e.message);
          } else if (error instanceof Error) {
            try {
              const parsed = JSON.parse(error.message);
              message = parsed.message || message;
              errors = parsed.errors || errors;
            } catch {
              message = error.message || message;
            }
          } else if (
            typeof error === "object" &&
            error !== null &&
            "message" in error &&
            "errors" in error
          ) {
            message = (error as any).message;
            errors = (error as any).errors || [];
          }

          throw new Error(JSON.stringify({ message, errors }));
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id ?? user.user?.ID;
        token.email = user.email ?? user.user?.Email;
        token.name = user.name ?? user.user?.Email;
        token.role = user.role ?? user.user?.Status;
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
        token.user = user.user;
      }
      // // Return previous token if the access token has not expired yet
      // if (Date.now() < token.accessTokenExpires) {
      //   return token;
      // }

      // // Access token has expired, try to update it
      // return refreshAccessToken(token);
      return token;
    },

    async session({ session, token }) {
      session.user = {
        id: token.id ?? token.user?.ID,
        email: token.email ?? token.user?.Email,
        name: token.name ?? token.user?.Email,
        role: token.role ?? token.user?.Status,
        accessToken: token.accessToken,
        refreshToken: token.refreshToken,
        user: token.user,
      };

      session.accessToken = token.accessToken;
      session.error = token.error ?? undefined;

      return session;
    },
  },
  events: {
    async signOut({ token }) {
      try {
        const cookie = require("cookie");
        const deviceId = cookie.parse(token?.deviceId || "")?.device_id || "";
        if (!deviceId || !token.accessToken) return;

        await signOutRest(token.refreshToken);
      } catch (error) {
        console.error("Logout event failed", error);
      }
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 7 * 24 * 60 * 60, // 7 days
  },
  pages: {
    signIn: "/auth/signin",
    signOut: "/auth/signin",
    error: "/error",
  },
  secret: process.env.AUTH_SECRET,
};

export { authOptions };
