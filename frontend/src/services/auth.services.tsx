const baseUrl =
   import.meta.env.VITE_ENVIRONMENT === "PRODUCTION"
      ? import.meta.env.VITE_PRODUCTION_URL
      : import.meta.env.VITE_LOCAL_URL;

// Debug logging - remove after fixing
console.log('Environment variables:', {
   VITE_ENVIRONMENT: import.meta.env.VITE_ENVIRONMENT,
   VITE_PRODUCTION_URL: import.meta.env.VITE_PRODUCTION_URL,
   VITE_LOCAL_URL: import.meta.env.VITE_LOCAL_URL,
   baseUrl
});

export const fetchSignUpRequest = async ({
   email,
   password,
}: {
   email: string;
   password: string;
}) => {
   const response = await fetch(`${baseUrl}/users/sign-up`, {
      method: "POST",
      headers: {
         "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
   });

   if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Sign up request failed");
   }

   return response.json();
};

export const fetchConfirmEmail = async (token: string) => {
   const response = await fetch(`${baseUrl}/users/confirm-email/${token}`, {
      method: "GET",
   });

   if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Email confirmation failed");
   }

   return response.json();
};

export const fetchLoginRequest = async ({
   email,
   password,
}: {
   email: string;
   password: string;
}) => {
   console.log(baseUrl);
   const response = await fetch(`${baseUrl}/users/login`, {
      method: "POST",
      headers: {
         "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
   });

   if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Login request failed");
   }

   return response.json();
};

export const fetchLogoutRequest = async (token: string) => {
   const response = await fetch(`${baseUrl}/users/logout`, {
      method: "POST",
      headers: {
         "Content-Type": "application/json",
         Authorization: `Bearer ${token}`,
      },
   });

   if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Logout request failed");
   }

   return response.json();
};

export const fetchDeleteAccount = async ({
   token,
   email,
}: {
   token: string;
   email: string;
}) => {
   const response = await fetch(`${baseUrl}/users/delete-account`, {
      method: "DELETE",
      headers: {
         "Content-Type": "application/json",
         Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ email }),
   });

   if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Delete account request failed");
   }

   return response.json();
};
