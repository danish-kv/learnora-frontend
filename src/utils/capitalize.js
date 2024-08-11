export const capitalizeFirstLetter = (word)  => {
    return word.replace(/\bw/g,(char) => char.toUpperCase())
}