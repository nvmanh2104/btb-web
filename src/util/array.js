export const moveElement = (array, oldIndex, newIndex) => {
    if (oldIndex < newIndex) {
      return array
        .slice(0, oldIndex)
        .concat(array.slice(oldIndex + 1, newIndex + 1))
        .concat([array[oldIndex]])
        .concat(array.slice(newIndex + 1, array.length))
    }
    return array
      .slice(0, newIndex + 1)
      .concat([array[oldIndex]])
      .concat(array.slice(newIndex + 1, oldIndex))
      .concat(array.slice(oldIndex + 1, array.length))
  }
  
  export const removeElement = (array, oldIndex) => array.filter((item, index) => index !== oldIndex)
  
  export const addElement = (array, newIndex, element) => array.slice(0, newIndex + 1).concat(element).concat(array.slice(newIndex + 1, array.length))
  