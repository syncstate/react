import { useEffect, useState, useContext } from 'react';
import SyncStateReactContext from '../components/Context';
import { ComputeCallback, DocStore } from '@syncstate/core';

export function useComputed(subtree: string, computeCallback: ComputeCallback) {
  const store: DocStore = useContext(SyncStateReactContext);

  const [computedValue, setComputedValue] = useState(undefined);

  useEffect(() => {
    const dispose = store.compute(subtree, (getValue: any, change: any) => {
      console.log('$$$$compute observer hook');
      const computed = computeCallback(getValue, change);

      setComputedValue(computed);
    });

    return dispose;
  }, []);

  console.log('computed value through hook', computedValue);

  return [computedValue];
}

export function useComputedDoc(computeCallback: ComputeCallback) {
  return useComputed('doc', computeCallback);
}
