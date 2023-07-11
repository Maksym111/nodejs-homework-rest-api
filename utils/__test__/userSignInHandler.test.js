const { userSignInHandler } = require("../userSignInHandler");

const testingData = {
  input: {
    email: "awdawd@dada.com",
    password: 123123,
    token: 4567876567828909,
    subscription: "pro",
    _id: "wdawd312e12df-3add4c33da-3cfzefz",
  },
  output: {
    user: {
      email: "awdawd@dada.com",
      subscription: "pro",
    },
    token: "4567876567828909",
  },
};

describe("Test signIn data", () => {
  test("Test data", () => {
    const handleData = userSignInHandler(testingData.input);
    expect(handleData).toStrictEqual(testingData.output);
  });
  test("Test data result status", () => {});
});
