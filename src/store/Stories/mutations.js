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

export function likeStory(state, payload) {
  const item = state.stories.find((_item) => _item._id === payload);
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
