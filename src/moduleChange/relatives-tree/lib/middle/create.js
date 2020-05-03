import byParents from '../children/byParents';
import getSpouses from '../utils/getSpouses';
import fixOverlaps from './fixOverlaps';
import { prop, withType, flat, hasDiffParents } from '../utils';
export default (store) => {
    let families = [];
    const createFamily = byParents(store);
    if (hasDiffParents(store.rootNode)) {
        const bloodParentIDs = store.rootNode.parents
            .filter(withType('blood'))
            .map(prop('id'));
        const adoptedParentIDs = store.rootNode.parents
            .filter(withType('adopted'))
            .map(prop('id'));
        const bloodFamily = createFamily(bloodParentIDs, 'root', true);
        const adoptedFamily = createFamily(adoptedParentIDs);
        fixOverlaps(bloodFamily, adoptedFamily);
        families = [bloodFamily, adoptedFamily];
    }
    else {
        const parentIDs = store.rootNode.parents.map(prop('id'));
        const mainFamily = createFamily(parentIDs, 'root', true);
        families.push(mainFamily);
        const parents = mainFamily.pUnits
            .map(prop('nodes'))
            .reduce(flat);
        if (parents.length === 2) {
            const { left, right } = getSpouses(store, parents);
            families = [
                ...left.map(node => createFamily([node.id])),
                ...families,
                ...right.map(node => createFamily([node.id])),
            ];
        }
    }
    if (families.length > 1) {
        for (let i = 1; i < families.length; i++) {
            families[i].left = families[i - 1].right;
        }
    }
    families.forEach(family => store.families.set(family.id, family));
    return store;
};
//# sourceMappingURL=create.js.map