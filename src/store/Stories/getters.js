export function stories(state) {
  return state.stories;
}

export function loading({ loading: _loading }) {
  return _loading;
}

export function perPage({ perPage: _perPage }) {
  return _perPage;
}
