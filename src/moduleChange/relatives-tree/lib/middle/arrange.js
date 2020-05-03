export default (families, start = 1, left = 0) => {
    if (families.length >= start + 1) {
        const shift = left - families[start].left;
        for (let i = start; i < families.length; i++) {
            families[i].left += shift;
        }
    }
};
//# sourceMappingURL=arrange.js.map