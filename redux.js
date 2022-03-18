// we create a reducer, that takes an object of functions. These functions run whenever dispatch is called, and their
// return value becomes out app's new state

const simplestReducer = Redux.combineReducers({
    todos: () => {
      return ['go to the doctor', 'phone friend'];
    }
  });

const reducer = Redux.combineReducers({
    // [] is the initial value of the state in this example
    todos: (state = [], action) => {
        // we make a copy of the state; we want it immutable
        const newState = Object.assign([], state);
        // we dispatch objects with "type" and "item" properties
        if (action.type == 'add') {
            newState.push(action.item);
        }
        // here we dispatch objects with "type" and "inedx" properties
        if (action.type == 'remove') {
            newState.splice(action.index, 1);
        }
        return newState;
    }
  });

// we use the reducer to create the store. We use the store for everything, like accessing the state and 
// dispatching events

// const store = Redux.createStore(simplestReducer);
const store = Redux.createStore(reducer);

// this is for checking the state on dev-tools' console with store.getState()
window.store = store
// for example, with the simplestReducer the result in console is:
// {todos: ['go to the doctor', 'phone friend']}


// FIRST "MAGIC": WE HAVE IN THE STORE OUR STATE, THAT HAS THE RETURNS OF THE REDUCER, WITHOUT HAVING TO DISPATCH ANYTHING
// AND WITHOUT EXECUTING THE REDUCER. SO THE STROE'S STATE IS AN OBJECT WITH ALL THE PROPERTIES OF THE OBJECT PASSED INTO 
// THE REDUCER, THE VALUES OF WICH WILL BE THE RETURNS OF THOSE FUNCTIONS

// now we inject the to-do list into the html based in our state
const render = () => {
    const container = document.getElementById('container');
    // to make sure that is empty
    container.innerHTML = '';
    const state = store.getState();
    // we print the list with the state
    state.todos.forEach((todo, i) => {
      const item = document.createElement('div');
      item.innerHTML = todo;
      container.appendChild(item);

      // a function to remove a to-do
      // this is the last part, see first the "add" type
      item.onclick = () => {
        store.dispatch({
          type: 'remove',
          index: i
        });
        // after dispatching we want to remove the item. This is not React so we have to do it manually!
        render();
      }

    });
};
// render here if we want to see what's in the list (this is, if we are using the simplestReducer)
// if not it's not necessary, because with the normal reducer the initial state is []
render()

// now we update the state when we add a to-do to the list
document.getElementById('submit-todo').onclick = () => {
    // we have to pass an object to the dispatch, normally with type and payload
    store.dispatch({
      type: 'add',
      item: document.getElementById('todo').value
    });
    // after dispatching we want to print the new item. This is not React so we have to do it manually!
    render()
};

// AFTER THE DISPATCH FUNCTION IS CALLED, OUR REDUCER WILL EXECUTE AND WE'LL GET A NEW STATE

// SECOND "MAGIC": THE STATE RECEIVED IN THE TODOS FUNCTION OF THE REDUCER COMES FROM THE STORE

