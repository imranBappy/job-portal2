import React, { useCallback } from 'react';
import { debounce } from 'lodash'


function useDebounce(callback, delay = 500,) {
  const debouncedFn = useCallback(
    debounce((...args) => callback(...args), delay),
    [delay] // will recreate if delay changes
  );

  return debouncedFn;
}

export default useDebounce;