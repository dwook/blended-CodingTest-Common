module.exports = function update(prevState, changes) {
  // type here

  for (const prop in changes) {
    if (prop === '$set') {
      return clone(changes[prop]);
    }
    if (prop === '$push') {
      return clone(prevState).concat(...changes[prop]);
    }
    if (prop === '$unshift') {
      return changes[prop].concat(...clone(prevState));
    }
    if (prop === '$merge') {
      return { ...clone(prevState), ...changes[prop] };
    }
    if (prop === '$splice') {
      const [value] = changes[prop];
      let nextState = clone(prevState);
      nextState.splice(...value);
      return nextState;
    }
    if (prop === '$apply') {
      return changes[prop](prevState);
    }
  }

  function clone(obj) {
    if (typeof obj !== 'object' || obj === null) return obj;
    const copy = Array.isArray(obj) ? [] : {};
    for (prop in obj) {
      const value = obj[prop];
      copy[prop] =
        typeof value === 'object' && value !== null ? clone(value) : value;
    }
    return copy;
  }
};
