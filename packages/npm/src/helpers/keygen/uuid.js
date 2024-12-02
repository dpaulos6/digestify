Object.defineProperty(exports, '__esModule', { value: true })
exports.generateUuid = void 0
const uuid_1 = require('uuid')
const generateUuid = () => {
  return (0, uuid_1.v4)()
}
exports.generateUuid = generateUuid
