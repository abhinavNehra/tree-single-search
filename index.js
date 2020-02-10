function searchChild(tree, searchText, matchedKey, childrenKey) {
    var selected = []
    tree.forEach( function(child) {
        if (child && child[childrenKey] && child[childrenKey].length) {
            if (child[matchedKey].includes(searchText)) {
                selected.push(child)
            } else {
                const searchedChild = searchChild(child[childrenKey], searchText, matchedKey, childrenKey)
                if (searchedChild && searchedChild.length) {
                    const obj = child
                    obj[childrenKey] = searchedChild
                    selected.push(obj)
                }
            }
        } else if (child && child[matchedKey] && child[matchedKey].includes(searchText)) {
            selected.push(child)
        }
    })
    return selected
}

module.exports = function(tree, searchText, keyName, childrenKey, caseSensitive) {
    var text = searchText
    if (caseSensitive) {
        text = searchText.toLowerCase()
    }
    return searchChild(tree, text, keyName, childrenKey)    
}

