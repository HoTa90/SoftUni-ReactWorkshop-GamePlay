import { useEffect, useState } from "react";
import { useAuth } from "../components/Auth/AuthContext.jsx"; 

const useFetch = (url, method = "GET") => {
  const [responseData, setResponseData] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);
  const { userData } = useAuth(); 

  const makeRequest = async (method, url, data = null) => {
    setIsPending(true);
    setError(null);
  
    try {
      const options = {
        method,
        headers: {},
      };
  
      if (data) {
        options.headers["Content-Type"] = "application/json";
        options.body = JSON.stringify(data);
      }
  
      if (userData?.token) {
        options.headers["X-Authorization"] = userData.token;
      }
  
      const baseUrl = 'http://localhost:3030';

      const response = await fetch(baseUrl + url, options);
  
      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.message || "Request failed");
      }
  
  
      const json = await response.json();
      setResponseData(json);
      return json; 
    } catch (err) {
      setError(err.message || "Could not fetch data");
      console.error(err.message);
    } finally {
      setIsPending(false);
    }
  };

 
  useEffect(() => {
    if (method === "GET" && url) {
      makeRequest(method, url);
    }
  }, [url, method]); 

 
  const post = (url, data) => makeRequest("POST", url, data);
  const put = (url, data) => makeRequest("PUT", url, data);
  const del = (url) => makeRequest("DELETE", url);

  return { data: responseData, isPending, error, post, put, del };
};

export default useFetch;