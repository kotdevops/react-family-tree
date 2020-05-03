import setUnitDefShifts from '../utils/setUnitDefShifts';
import { prop, withId } from '../utils';
export default (lFamily, rFamily) => {
    const lChildren = lFamily.cUnits
        .reduce((a, b) => a.concat(b.nodes), []);
    const rChildren = rFamily.cUnits
        .reduce((a, b) => a.concat(b.nodes), []);
    const ids = lChildren.filter(node => !!rChildren.find(withId(node.id))).map(prop('id'));
    const shifts = lFamily.cUnits.map(prop('shift'));
    lFamily.cUnits = lFamily.cUnits.sort((a, b) => {
        const foundA = !!a.nodes.find(node => ids.indexOf(node.id) !== -1);
        const foundB = !!b.nodes.find(node => ids.indexOf(node.id) !== -1);
        if (foundA && !foundB)
            return 1;
        else if (!foundA && foundB)
            return -1;
        return 0;
    });
    lFamily.cUnits.forEach((unit, idx) => unit.shift = shifts[idx]);
    rFamily.cUnits = rFamily.cUnits.filter(unit => (!!unit.nodes.find(node => ids.indexOf(node.id) === -1)));
    setUnitDefShifts(rFamily);
};
//# sourceMappingURL=fixOverlaps.js.map