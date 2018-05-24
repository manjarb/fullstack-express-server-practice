// keys.js logic to return correct environment key
if (process.env.NODE_ENV === 'production') {
    // In Production - return prod key
    module.exports = require('./prod');
} else {
    // In Dev - return dev keys
    module.exports = require('./dev');
}