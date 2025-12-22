const baseUrl =
   import.meta.env.VITE_ENVIRONMENT === "PRODUCTION"
      ? import.meta.env.VITE_PRODUCTION_URL
      : import.meta.env.VITE_LOCAL_URL;

export const fetchUpdateWeightUnitPreference = async ({
   token,
   weightUnitPreferenceId,
}: {
   token: string;
   weightUnitPreferenceId: number;
}) => {
   const response = await fetch(
      `${baseUrl}/users/update-weight-unit-preference`,
      {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
         },
         body: JSON.stringify({ weightUnitPreferenceId }),
      }
   );

   if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Update weight unit preference request failed");
   }

   return response.json();
};

export const fetchUpdatePassword = async ({
   token,
   newPassword,
}: {
   token: string;
   newPassword: string;
}) => {
   const response = await fetch(`${baseUrl}/users/update-password`, {
      method: "POST",
      headers: {
         "Content-Type": "application/json",
         Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ newPassword }),
   });

   if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Update password request failed");
   }

   return response.json();
};

export const fetchUpdateUserEmail = async ({
   token,
   newEmail,
}: {
   token: string;
   newEmail: string;
}) => {
   const response = await fetch(`${baseUrl}/users/update-email`, {
      method: "POST",
      headers: {
         "Content-Type": "application/json",
         Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ newEmail }),
   });

   if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Update email request failed");
   }

   return response.json();
};

export const fetchDeleteUser = async ({ token }: { token: string }) => {
   const response = await fetch(`${baseUrl}/users/delete-user`, {
      method: "DELETE",
      headers: {
         "Content-Type": "application/json",
         Authorization: `Bearer ${token}`,
      },
   });

   if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Delete user request failed");
   }

   return response.json();
};
