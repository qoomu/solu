const orm = {factory: () => {}};
function factory() {
  return orm.factory();
}
factory.orm = orm;
module.exports = factory;
