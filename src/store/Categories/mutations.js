export function add({ list }, payload) {
  list.push(payload);
}

export function all(state, payload) {
  state.list = payload;
}

export function _delete({ list }, payload) {
  list.splice(list.indexOf(payload), 1);
}

export function update({ list }, payload) {
  const source = list.find((item) => item._id === payload._id);
  Object.assign(source, payload);
}
