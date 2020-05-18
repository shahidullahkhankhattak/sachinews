export function add({ list, autocomplete, autocompleteFilter }, payload) {
  list.push(payload);
  const index = autocomplete.indexOf(payload.selector);
  const filterIndex = autocompleteFilter.indexOf(payload.filter);
  if (index === -1 && payload.selector) { autocomplete.push(payload.selector); }
  if (filterIndex === -1 && payload.filter) { autocompleteFilter.push(payload.filter); }
}

export function all(state, { list, autocomplete, autocompleteFilter }) {
  state.list = list || [];
  state.autocomplete = autocomplete.filter((f) => f && f !== '') || [];
  state.autocompleteFilter = autocompleteFilter.filter((f) => f && f !== '') || [];
}

export function _delete({ list }, payload) {
  list.splice(list.indexOf(payload), 1);
}

export function update({ list, autocomplete, autocompleteFilter }, payload) {
  const item = list.find((_item) => _item._id === payload._id);
  const index = autocomplete.indexOf(payload.selector);
  const filterIndex = autocompleteFilter.indexOf(payload.filter);
  if (index === -1 && payload.selector) { autocomplete.push(payload.selector); }
  if (filterIndex === -1 && payload.filter) { autocompleteFilter.push(payload.filter); }
  Object.assign(item, payload);
}
