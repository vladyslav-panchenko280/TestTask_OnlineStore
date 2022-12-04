export function findObjectValues(obj, searchKey, once = true) {
    let res = once ? null : [];
    for (let i in obj) {
        if (obj.hasOwnProperty(i)) {
            if (i === searchKey) {
                if (once) {
                    res = obj[i];
                    break;
                } else {
                    res.push(obj[i]);
                }
            }
            if (obj[i] && obj[i].constructor === Object) {
                let check = findObjectValues(obj[i], searchKey);
                if (check) {
                    if (once) {
                        res = check;
                        break;
                    } else {
                        res.push(check);
                    }
                }
            }
        }
    }
    return once ? res : res.flat();
}


