import { prop, max } from '../utils';
class Family {
    constructor(id, type, isMain = false) {
        this.id = id;
        this.type = type;
        this.main = isMain;
        this.pID = null;
        this.cID = null;
        this.top = 0;
        this.left = 0;
        this.pUnits = [];
        this.cUnits = [];
    }
    get width() {
        return max([...this.pUnits, ...this.cUnits].map(prop('right')));
    }
    get right() {
        return this.left + this.width;
    }
    get pCount() {
        return this.pUnits.reduce((a, b) => a + b.size, 0);
    }
    get cCount() {
        return this.cUnits.reduce((a, b) => a + b.size, 0);
    }
    get pUnitsWithParents() {
        return this.pUnits.filter(unit => (!!unit.nodes.find(node => !!node.parents.length)));
    }
    get cUnitsWithChildren() {
        return this.cUnits.filter(unit => (!!unit.nodes.find(node => !!node.children.length)));
    }
}
export default Family;
//# sourceMappingURL=family.js.map