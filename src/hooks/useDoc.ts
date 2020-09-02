import { useEffect, useState, useContext } from 'react';
import SyncStateReactContext from '../components/Context';
import { produceWithPatches, enablePatches } from 'immer';
enablePatches();

//create your forceUpdate hook
function useForceUpdate() {
  const [value, setValue] = useState(0); // integer state
  return () => setValue(value => ++value); // update the state to force render
}

export function useSyncState(
  subtree: string,
  path: Array<string | number> = [],
  depth: number = 1
) {
  const forceUpdate = useForceUpdate();
  const store: any = useContext(SyncStateReactContext);

  useEffect(() => {
    const dispose = store.observe(subtree, path, () => forceUpdate(), depth);

    return dispose;
  }, []);
  // console.log(path, doc.getStateAtPath(path), 'doc.getStateAtPath(path)');

  return store.useDoc(subtree, path);
}

export function useDoc(
  subtree: string,
  path: Array<string | number> = [],
  depth: number = 1
) {
  return useSyncState(subtree, path, depth);
}
