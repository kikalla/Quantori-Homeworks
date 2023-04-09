let state = undefined;
let search = "";

function useState(initialValue) {
  state = state || initialValue;

  function setValue(newValue) {
    state = newValue;
    renderApp();
  }

  return [state, setValue];
}
