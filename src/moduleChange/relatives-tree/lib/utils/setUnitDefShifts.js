const shiftUnits = (units, shift) => {
    units.forEach((unit, idx, self) => (unit.shift = idx === 0 ? shift : self[idx - 1].right));
};
export default (family) => {
    const diff = family.cCount - family.pCount;
    shiftUnits(family.pUnits, diff > 0 ? Math.abs(diff) : 0);
    shiftUnits(family.cUnits, diff < 0 ? Math.abs(diff) : 0);
};
//# sourceMappingURL=setUnitDefShifts.js.map