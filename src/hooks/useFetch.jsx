import { useSession } from "@clerk/clerk-react";
import { useState } from "react";
// this hook takes a callback function and options as parameters and returns data, loading, error and a function to call the callback
// use of this hook is to fetch data from an api with authentication token from clerk
// the callback function should be an async function that takes the token and options as parameters
// the options are optional and can be used to pass additional parameters to the callback function
const useFetch = (cb, options = {}) => {
  const [data, setData] = useState(undefined);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);

  const { session } = useSession();
//  fn is the function to call the callback function this 
  const fn = async (...args) => {
    setLoading(true);
    setError(null);

    try {
      const supabaseAccessToken = await session.getToken({
        template: "supabase",
      });
      const response = await cb(supabaseAccessToken, options, ...args);
      setData(response);
      setError(null);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, fn };
};

export default useFetch;