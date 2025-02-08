require("dotenv").config();
const account = require("./account");
const user = {};
const photo = {};
const comment = {};

const models = {
  account: {
    create: async (data) => {
      return await account.create("test");
    },
    get: async (data) => {
      return await account.get(data.account);
    },
    users: async (data) => {
      return await account.users(data.account);
    },
    update: async (data) => {
      return await account.update(data.account, { plan: "paid" });
    },
    delete: async (data) => {
      return await account.delete(data.account);
    },
  },
  user: {
    create: async (data) => {
      return await user.create(
        { email: "email@domain.com", password: "test" },
        data.account,
      );
    },
    get: async (data) => {
      return await user.get(
        data.user,
        "email@domain.com",
        data.account,
        "owner",
        "username",
      );
    },
    update: async (data) => {
      return await user.update(data.user, data.account, {
        last_active: new Date(),
        bio: "avatar",
      });
    },
    public: async (data) => {
      return await user.public("username");
    },
    account: async (data) => {
      return await user.account(data.user);
    },
    account_add: async (data) => {
      return await user.account.add(data.user, data.account, {
        permission: "owner",
        username: "username",
      });
    },
    account_delete: async (data) => {
      return await user.account.delete(data.user, data.account);
    },
    delete: async (data) => {
      return await user.delete(data.user, data.account);
    },
  },
  photo: {
    create: async (data) => {
      return await photo.create(
        { name: "test.jpg", description: "Photo test" },
        data.user,
        data.account,
      );
    },
    get: async (data) => {
      return await photo.get(null, data.user, data.account);
    },
    update: async (data) => {
      return await photo.update(
        data.id,
        { description: "update description" },
        data.user,
        data.account,
      );
    },
    total: async (data) => {
      return await photo.total(data.user, data.account);
    },
    like: async (data) => {
      return await photo.like(data.id, data.user);
    },
    like_total: async (data) => {
      return await photo.like.total(data.user, data.account);
    },
    unlike: async (data) => {
      return await photo.unlike(data.id, data.user);
    },
    delete: async (data) => {
      return await photo.delete(data.id, data.user, data.account);
    },
  },
  comment: {
    create: async (data) => {
      return await comment.create(
        data.id,
        { text: "test comment" },
        data.user,
        data.account,
      );
    },
    get: async (data) => {
      return await comment.get(null, data.id);
    },
    total: async (data) => {
      return await comment.total(data.user, data.account);
    },
    delete: async (data) => {
      return await comment.delete(data.id, data.user);
    },
  },
};

async function run() {
  const args = process.argv.splice(2); // command-line arguments
  const model = args[0].split(".")[0];
  const method = args[0].split(".")[1];
  const user = args[1],
    account = args[2],
    id = args[3];

  console.log(`Testing ${model}.${method} model`);
  const res = await models[model][method]({ user, account, id });
  console.log(res);
  process.exit();
}

run();
