export function add({ list, autocomplete }, payload) {
  list.push(payload);
  const index = autocomplete.indexOf(payload.selector);
  if (index === -1) { autocomplete.push(payload.selector); }
}

export function all(state, { list, autocomplete }) {
  state.list = list || [];
  state.autocomplete = autocomplete || [];
}

export function _delete({ list }, payload) {
  list.splice(list.indexOf(payload), 1);
}

export function update({ list, autocomplete }, payload) {
  const item = list.find((_item) => _item._id === payload._id);
  const index = autocomplete.indexOf(payload.selector);
  if (index === -1) { autocomplete.push(payload.selector); }
  Object.assign(item, payload);
}
