export function getSpecialKey(id, selectedAttributes) {
     let arrayKey = []
     arrayKey.push(id)
     selectedAttributes.forEach(el => {
          arrayKey.push(el.name.split(" ").join("_"));
          arrayKey.push(el.items.value.split(" ").join("_"));
     });
     
     return arrayKey.join("-");
}