export function fetchTopStories({ topStories }, { stories, total, done }) {
  topStories.stories.push(...stories);
  topStories.total = total;
  done && done();
}

export function setLoading(state, payload) {
  state.loading = payload;
}

export function resetStories({ topStories }) {
  topStories.stories = [];
  topStories.total = -1;
}
