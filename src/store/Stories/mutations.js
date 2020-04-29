export function fetchStories(state, { stories, total, done }) {
  state.stories.push(...stories);
  state.total = total;
  done && done();
}

export function setLoading(state, payload) {
  state.loading = payload;
}

export function resetStories(state) {
  state.stories = [];
  state.total = -1;
}
