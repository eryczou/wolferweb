import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from '../reducers';

export default function configureStore (initialState) {

  const middleware = applyMiddleware(thunk, createLogger());

  let createStoreWithMiddleware;
  if (__DEBUG__) {
    createStoreWithMiddleware = compose(
      middleware,
      window.devToolsExtension
        ? window.devToolsExtension()
        : require('../containers/DevTools').instrument()
    );
  } else {
    createStoreWithMiddleware = compose(middleware);
  }

  const store = createStoreWithMiddleware(createStore)(rootReducer, initialState);

  if (module.hot) {
    module.hot.accept(rootReducer, () => {
      const nextRootReducer = rootReducer.default;
      store.replaceReducer(nextRootReducer);
    })
  }

  return store;
}
