const account = require('../model/account');
const user = require('../model/user');
const utility = require('../utils/utilities');

exports.create = async function (req, res) {
    const data = req.body;
    utility.validate(data, ['email', 'username', 'password']);

    // create a account
    console.log(data);
    const accountData = await account.create(data.plan);
    const userData = await user.create(
        {
            ...data,
            default_account: accountData.id,
        },
        accountData.data,
    );
    await user.account.add(userData.id, accountData.id, {
        permission: 'owner',
        username: data.username,
    });
    return res.status(200).send({ data: accountData });
};
