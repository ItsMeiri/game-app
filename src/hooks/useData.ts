import { useEffect, useState } from "react";
import apiClient from "../services/api-client";
import { AxiosRequestConfig, CanceledError } from "axios";

  
  interface FetchResponse<T> {
    count: number;
    results: T[];
  }
    
      
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const useData = <T>(endpoint: string, requestCongif?: AxiosRequestConfig, deps?: any[]) => {

        const [data, setData] = useState<T[]>([]);
        const [error, setError] = useState("");
        const [isLoading, setLoading] = useState(false);
      
        useEffect(() => {
          setLoading(true);
          const controller = new AbortController()
          apiClient
            .get<FetchResponse<T>>(endpoint, {signal: controller.signal, ...requestCongif} )
            .then((res) => {
              setData(res.data.results)
              setLoading(false)
            })
            .catch((e) => {
              if (e instanceof CanceledError) return;
              setError(e.message);
              setLoading(false)
              
            })
            return () =>  controller.abort()
            
        },deps ? [...deps] : []);
        return { data, error, isLoading };
      }


export default useData