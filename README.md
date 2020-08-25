# SyncState React

### Introduction

`@syncstate/react` lets your React components read data from a [SyncState](https://syncstate.github.io/) store and dispatch actions to the store using hooks.

### Provider

Provider is a component that makes the store available throughout your App for use using React's Context API. The following example shows how the store is passed to Provider which makes it accessible from anywhere inside `<App />`.

```tsx
const rootElement = document.getElementById('root');
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootElement
);
```

### useDoc()

**Arguments**

path: Array<string | number>, this is similar (but not the same) to the [RFC-6902 JSON patch standard](http://tools.ietf.org/html/rfc6902), except that the path is an array, rather than a string

useDoc() hook listens to the updates on the path ([push strategy](https://twitter.com/kentcdodds/status/1180157212485771264)) that the component is listening to and forces an update. useDoc returns :

- state at path.
- function() to modify the state.
- and a dispatch function for you to dispatch any action.

```tsx
import { createDocStore } from '@syncstate/core';
import { useDoc } from '@syncstate/react';

const store = createDocStore({ counter: { count: 0 } }, []);

// Inside a React component
const [counter, setCounter, dispatch] = useDoc(['counter']);

const increment = () =>
  setCounter((counter) => {
    counter.count++;
  });

const decrement = () =>
  setDoc((counter) => {
    counter.count--;
  });
```

### Here's a Counter App demonstrating the use of Provider and useDoc()

```tsx
import React from 'react';
import ReactDOM from 'react-dom';
import { createDocStore } from '@syncstate/core';
import './styles.css';
import { useDoc, Provider } from '@syncstate/react';
import history from '@syncstate/history';

const store = createDocStore({ count: 0 }, [history.plugin]);

function App() {
  const [doc, setDoc, dispatch] = useDoc();

  const increment = () =>
    setDoc((doc) => {
      doc.count++;
    });

  const decrement = () =>
    setDoc((doc) => {
      doc.count--;
    });

  return (
    <div className="App">
      <h1>Counter (Undo/Redo) with SyncState</h1>
      <div>
        <button onClick={decrement}>-</button>
        &nbsp;&nbsp;
        {doc.count}
        &nbsp;&nbsp;
        <button onClick={increment}>+</button>
      </div>

      <div className="undoredo">
        <button
          onClick={() => {
            dispatch(history.undo());
          }}
        >
          Undo
        </button>
        <button
          onClick={() => {
            dispatch(history.redo());
          }}
        >
          Redo
        </button>
      </div>
    </div>
  );
}

const rootElement = document.getElementById('root');
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootElement
);
```
