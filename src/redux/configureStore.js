import { createStore,applyMiddleware,compose} from 'redux';
import rootReducers from './reducers';
//import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import thunk from 'redux-thunk';

export default function configureStore(initialStore){
  // eslint-disable-next-line no-undef
  const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
  return createStore(
    rootReducers,
    initialStore,
    composeEnhancers(applyMiddleware(thunk))
    );
}