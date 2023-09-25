const { queries } = require("../config/cofiguration");
const connection = require("../config/connection");
const { hashPassword } = require("../security/encryption");

async function createUser(user) {
  try {
    const hashedPassword = await hashPassword(user.password);
    const params = [
      user.fullname,
      user.address,
      user.gender,
      user.birthdate,
      user.age,
      user.status,
      user.phone,
      user.type,
      user.email,
      hashedPassword,
      ,
    ];
    await connection(queries.AUTH_QUERIES.SIGN_UP, params);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

async function getUserByEmail(email) {
  try {
    const result = await connection(queries.AUTH_QUERIES.GET_USER_BY_EMAIL, [
      email,
    ]);
    return result;
  } catch (error) {
    return [];
  }
}
async function getUserByID(id) {
  try {
    const result = await connection(queries.AUTH_QUERIES.GET_USER_BY_ID, [id]);
    return result;
  } catch (error) {
    console.log(error);
    return [];
  }
}



module.exports = {
  createUser,
  getUserByEmail,
  getUserByID,
};
