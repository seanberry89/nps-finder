import { useState, useEffect } from 'react';

export const useSearchDebounce = (value, delay) => {

  const [ debounceSearch, setDebounceSearch ] = useState(value);


  useEffect(() => {

    const timer = setTimeout(() => {

      setDebounceSearch(value);

    }, delay);

    return () => {

      clearTimeout(timer);

    };

      // eslint-disable-next-line
  }, [value, delay]);


  return debounceSearch;

};
