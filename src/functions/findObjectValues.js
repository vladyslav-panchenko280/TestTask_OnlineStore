export function findObjectValues(obj, searchKey) {
    let res = null;
    for (let i in obj) {
        if (obj.hasOwnProperty(i)) {
            if (i === searchKey) {
                res = obj[i];
                break;
            }
            if (obj[i] && obj[i].constructor === Object) {
                let check = findObjectValues(obj[i], searchKey);
                if (check) {
                    res = check;
                    break;
                }
            }
        }
    }
    return res;
}


