import { relToNode } from '../utils';
const createRel = (id, type = 'blood') => ({ id, type });
const createNode = (gender) => ({
    id: `${gender}-placeholder`,
    placeholder: true,
    gender: gender,
    parents: [],
    siblings: [],
    spouses: [],
    children: [],
});
const createParents = (store, root) => {
    const father = createNode('male');
    const mother = createNode('female');
    father.spouses = [createRel(mother.id, 'married')];
    mother.spouses = [createRel(father.id, 'married')];
    return [father, mother].map(node => {
        node.children = root.siblings.concat(createRel(root.id));
        store.nodes.set(node.id, node);
        return createRel(node.id);
    });
};
const setParents = (parents) => (node) => node.parents = parents.slice();
export default (store) => {
    if (store.rootNode.parents.length)
        return store;
    const root = store.rootNode;
    const setParentsTo = setParents(createParents(store, root));
    setParentsTo(root);
    root.siblings
        .map(relToNode(store))
        .forEach(setParentsTo);
    return store;
};
//# sourceMappingURL=placeholders.js.map