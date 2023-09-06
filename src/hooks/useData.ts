import { useEffect, useState } from "react";
import apiClient from "../services/api-client";
import { AxiosRequestConfig, CanceledError } from "axios";

  
  interface FetchResponse<T> {
    count: number;
    results: T[];
  }
    
      
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
 /**
  * Custom hook to fetch data from an API endpoint.
  * 
  * @template T - The type of data to be fetched.
  * @param {string} endpoint - The API endpoint to fetch data from.
  * @param {AxiosRequestConfig} [requestConfig] - Optional request configuration.
  * @param {any[]} [deps] - Optional dependencies for the useEffect hook.
  * @returns {Object} - An object containing the fetched data, error message, and loading state.
  */
 // eslint-disable-next-line @typescript-eslint/no-explicit-any
 const useData = <T>(endpoint: string, requestConfig?: AxiosRequestConfig, deps?: any[]) => {
 
   // Define state variables to hold the fetched data, error message, and loading state
   const [data, setData] = useState<T[]>([]);
   const [error, setError] = useState("");
   const [isLoading, setLoading] = useState(false);
 
   useEffect(() => {
     // Set the loading state to true when the effect starts
     setLoading(true);
 
     // Create an AbortController instance to handle aborting the request
     const controller = new AbortController();
 
     // Make the API request using the provided endpoint and request configuration
     apiClient
       .get<FetchResponse<T>>(endpoint, { signal: controller.signal, ...requestConfig })
       .then((res) => {
         // Update the data state with the fetched data
         setData(res.data.results);
         // Set the loading state to false when the request is successful
         setLoading(false);
       })
       .catch((e) => {
         // Handle errors and set the error state
         if (e instanceof CanceledError) return;
         setError(e.message);
         // Set the loading state to false when the request fails
         setLoading(false);
       });
 
     // Cleanup function to abort the request when the effect is cleaned up
     return () => controller.abort();
   }, deps ? [...deps] : []);
 
   // Return the fetched data, error message, and loading state
   return { data, error, isLoading };
 }


export default useData