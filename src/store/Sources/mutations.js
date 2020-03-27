export function addSource({ sources: { list } }, payload) {
  list.push(payload);
}

export function errors({ sources }, payload) {
  sources.errors = payload;
}

export function allSources({ sources }, payload) {
  sources.list = payload;
}

export function deleteSource({ sources: { list } }, payload) {
  list.splice(list.indexOf(payload), 1);
}

export function updateSource({ sources: { list } }, payload) {
  const source = list.find((item) => item._id === payload._id);
  Object.assign(source, payload);
}
