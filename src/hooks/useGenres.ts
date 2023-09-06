import { useEffect, useState } from "react";
import apiClient from "../services/api-client";
import { CanceledError } from "axios";

export interface Genre {
    id: number;
    name: string;
    
  }
  
  export interface Platform {
    id: number;
    name: string;
    slug: string;
  }
  
  interface FetchGenresResponse {
    count: number;
    results: Genre[];
  }

    
      
      const useGenres = () => {
        const [genres, setGenres] = useState<Genre[]>([]);
        const [error, setError] = useState("");
        const [isLoading, setLoading] = useState(false);
      
        useEffect(() => {
          setLoading(true);
          const controller = new AbortController()
          apiClient
            .get<FetchGenresResponse>("/genres", {signal: controller.signal})
            .then((res) => {
              setGenres(res.data.results)
              setLoading(false)
            })
            .catch((e) => {
              if (e instanceof CanceledError) return;
              setError(e.message);
              setLoading(false)
              
            })
            return () =>  controller.abort()
            
        },[]);
        return { genres, error, isLoading };
      }


export default useGenres