export function fetchTopStories({ topStories }, payload) {
  topStories.push(...payload);
}

export function setLoading(state, payload) {
  state.loading = payload;
}
