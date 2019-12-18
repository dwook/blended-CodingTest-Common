module.exports = function update(prevState, changes) {
  for (const prop in changes) {
    if (prop === '$push') {
      return prevState.concat(...changes[prop]);
    }
    if (prop === '$unshift') {
      return changes[prop].concat(...prevState);
    }
    if (prop === '$splice') {
      const [value] = changes[prop];
      let nextState = prevState.slice();
      nextState.splice(...value);
      return nextState;
    }
    if (prop === '$apply') {
      return changes[prop](prevState);
    }
    if (prop === '$merge') {
      return { ...prevState, ...changes[prop] };
    }
    if (prop === '$set') {
      return changes[prop];
    }
  }

  const propList = [];
  let value;
  function findSetCommand(obj) {
    for (const prop in obj) {
      if (prop === '$set') {
        return (value = obj[prop]);
      } else {
        propList.push(prop);
        return findSetCommand(obj[prop]);
      }
    }
  }
  findSetCommand(changes);

  function makeNextState(changedValue, nestedPropList) {
    let obj = nestedPropList.reduceRight(
      (changedValue, nestedPropList) => ({
        [nestedPropList]: changedValue
      }),
      changedValue
    );
    return obj;
  }
  let nextState = makeNextState(value, propList);

  return { ...prevState, ...nextState };
};
