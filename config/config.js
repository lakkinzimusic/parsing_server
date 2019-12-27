const [, , ...args] = process.argv;
let DIR = undefined;
if (!args[0]) {
    DIR = './library'
}
else {
    DIR = args[0].substr(-1) === '/' ? args[0].substring(0, args[0].length - 1) : args[0];
}
let tmp_folder = './tmp_folder';
module.exports = {
    DIR, tmp_folder
};