const prop = (name) => (item) => item[name];
const withId = (id) => (item) => item.id === id;
const withType = (...types) => (item) => types.includes(item.type);
const withSameIDs = (target) => (unit) => target.ids.join('') === unit.ids.join('');
const flat = (items, item) => items.concat(item);
const unique = (item, index, arr) => arr.indexOf(item) === index;
const inAscOrder = (v1, v2) => v1 - v2;
const pipe = (...fus) => (init) => fus.reduce((res, fn) => fn(res), init);
const relToNode = (store) => (rel) => store.getNode(rel.id);
const min = (arr) => Math.min.apply(null, arr);
const max = (arr) => Math.max.apply(null, arr);
const hasDiffParents = (node) => node.parents.map(prop('type')).filter(unique).length > 1;
export { prop, withId, withType, withSameIDs, flat, unique, inAscOrder, pipe, relToNode, min, max, hasDiffParents, };
//# sourceMappingURL=index.js.map