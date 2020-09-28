import { useEffect, useState, useContext } from 'react';
import SyncStateReactContext from '../components/Context';

//create your forceUpdate hook
function useForceUpdate() {
  const [value, setValue] = useState(0); // integer state
  return () => setValue(value => ++value); // update the state to force render
}

export function useSyncState(
  subtree: string,
  path: string = '',
  depth: number = 1
) {
  const forceUpdate = useForceUpdate();
  const store: any = useContext(SyncStateReactContext);

  useEffect(() => {
    const dispose = store.observe(subtree, path, () => forceUpdate(), depth);

    return dispose;
  }, []);
  // console.log(path, doc.getStateAtPath(path), 'doc.getStateAtPath(path)');

  return store.useSyncState(subtree, path);
}

export function useDoc(path: string = '', depth: number = 1) {
  return useSyncState('doc', path, depth);
}
