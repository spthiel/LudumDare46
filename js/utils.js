/**
 *
 * @param array {Array | number}
 * @param [max] {number | undefined}
 * @return {number|*}
 */
function random(array, max) {
    if(typeof array === "number") {
        return (Math.random() * (max - array) + array) | 0;
    }
    return array[random(0, array.length)];
}
