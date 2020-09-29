import { useContext } from 'react';
import SyncStateReactContext from '../components/Context';
import { DocStore } from '@syncstate/core';

export function useStore() {
  const store: DocStore = useContext(SyncStateReactContext);

  return store;
}
