export function rounding(cents){
    return (Math.round(cents)/100).toFixed(2);
}

export function getProduct(arr, id){
    const product = arr.find(item => item.id === id);
    return product;
}