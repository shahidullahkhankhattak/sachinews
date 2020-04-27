export function fetchTopStories({ topStories: { stories } }, payload) {
  stories.push(...payload);
}

export function setLoading(state, payload) {
  state.loading = payload;
}
