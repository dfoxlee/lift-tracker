const baseUrl =
   import.meta.env.VITE_ENVIRONMENT === "PRODUCTION"
      ? import.meta.env.VITE_PRODUCTION_URL
      : import.meta.env.VITE_LOCAL_URL;

export const fetchGetCompletedExercisesHistory = async (token: string) => {
   const response = await fetch(`${baseUrl}/completed-exercises/history`, {
      method: "GET",
      headers: {
         "Content-Type": "application/json",
         Authorization: `Bearer ${token}`,
      },
   });

   if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to fetch completed exercises history");
   }

   return response.json();
};
