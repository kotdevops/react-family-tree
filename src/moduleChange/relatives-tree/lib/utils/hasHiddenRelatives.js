import { withId } from './index';
const inUnits = (units, nodeId) => (!!units.find(unit => (!!unit.nodes.find(withId(nodeId)))));
export default (family, node) => {
    if (family.type !== 'child' && inUnits(family.pUnits, node.id)) {
        return ((!node.parents.length && !!node.siblings.length) ||
            (family.type === 'parent' && node.children.length > 1));
    }
    if (family.type !== 'parent' && inUnits(family.cUnits, node.id)) {
        const parentIds = family.pUnits[0].ids;
        const sameParents = !!node.parents
            .filter(rel => parentIds.indexOf(rel.id) !== -1)
            .length;
        return (!sameParents && (!!node.parents.length || !!node.siblings.length));
    }
    return false;
};
//# sourceMappingURL=hasHiddenRelatives.js.map