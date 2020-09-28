import { useEffect, useState, useContext } from 'react';
// @ts-ignore
import SyncStateReactContext from '../components/Context';
import { produceWithPatches, enablePatches } from 'immer';
import { ComputeCallback, DocStore } from '@syncstate/core';
enablePatches();

//create your forceUpdate hook
function useForceUpdate() {
  const [value, setValue] = useState(0); // integer state
  return () => setValue(value => ++value); // update the state to force render
}

export function useComputed(subtree: string, computeCallback: ComputeCallback) {
  // const forceUpdate = useForceUpdate();
  const store: DocStore = useContext(SyncStateReactContext);

  const [computedValue, setComputedValue] = useState(undefined);

  useEffect(() => {
    const dispose = store.compute(subtree, (getValue, change) => {
      console.log('$$$$compute observer hook');
      const computed = computeCallback(getValue, change);

      setComputedValue(computed);
    });
  }, []);

  console.log('computed value through hook', computedValue);

  return [computedValue];
}

// export function useDoc(path: string = '', depth: number = 1) {
//   return useSyncState('doc', path, depth);
// }
