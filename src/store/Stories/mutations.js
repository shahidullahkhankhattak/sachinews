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

export function fetchStory(state, payload) {
  state.story = payload;
}

export function removeStory(state) {
  state.story = null;
}

export function likeStory(state, { id, main }) {
  let item = state.story;
  if (!main) { item = state.stories.find((_item) => _item._id === id); }
  if (!item.liked) {
    Object.assign(item, {
      ...item,
      liked: true,
      likes: (item.likes || 0) + 1,
    });
  } else {
    Object.assign(item, {
      ...item,
      liked: false,
      likes: (item.likes || 0) - 1,
    });
  }
}
