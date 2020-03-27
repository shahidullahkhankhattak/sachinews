export function allSources({ sources: { list } }) {
  return list;
}

export function errors({ sources: { errors: sourceErrors } }) {
  return sourceErrors;
}
