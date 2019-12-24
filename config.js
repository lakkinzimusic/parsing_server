const [, , ...args] = process.argv;

module.exports = {
    DIR: args[0].substr(-1) === '/' ? args[0].substring(0, args[0].length - 1) : args[0],
}