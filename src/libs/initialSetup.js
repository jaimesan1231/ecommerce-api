const Role = require("../Models/Role");

exports.createRoles = async () => {
  try {
    const count = await Role.estimatedDocumentCount();
    if (count > 0) return;
    const values = await Promise.all([
      new Role({ name: "Administrador" }).save(),
    ]);
    console.log(values);
  } catch (error) {
    console.log(error);
  }
};
