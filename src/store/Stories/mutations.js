export function fetchTopStories(state, payload) {
  state.topStories = { stories: payload, loading: false };
}
