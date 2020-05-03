import Family from '../models/family';
import Unit from '../models/unit';
import { withId, relToNode } from '../utils';
import getSpouses from '../utils/getSpouses';
import setUnitDefShifts from '../utils/setUnitDefShifts';
export default (store) => {
    return function (parentIDs, type = 'root', isMain = false) {
        const family = new Family(store.getNextId(), type, isMain);
        const parents = parentIDs.map(store.getNode.bind(store));
        if (family.main)
            parents.sort((a, b) => (b.gender !== store.gender) ? -1 : 0);
        family.pUnits.push(new Unit(family.id, parents));
        let children = [];
        if (parents.length === 1) {
            children = parents[0].children.map(relToNode(store));
        }
        else {
            const firstParent = parents[0];
            const secondParent = parents[1];
            children = firstParent.children
                .filter(rel => secondParent.children.find(withId(rel.id)))
                .map(relToNode(store));
        }
        children.forEach(child => {
            if (child.spouses.length) {
                const { left, middle, right } = getSpouses(store, [child]);
                [...left.map(node => [node]), middle, ...right.map(node => [node])].forEach(nodes => (family.cUnits.push(new Unit(family.id, nodes, true))));
            }
            else {
                family.cUnits.push(new Unit(family.id, [child], true));
            }
        });
        setUnitDefShifts(family);
        return family;
    };
};
//# sourceMappingURL=byParents.js.map