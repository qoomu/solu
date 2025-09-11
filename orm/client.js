const orm = {};
function factory() {
  return orm;
}
factory.orm = orm;
module.exports = factory;
