const db = require('./knex')();
const { v4: uuidv4 } = require('uuid');

exports.create = async function (plan) {
    const data = {
        id: uuidv4(),
        active: true,
        plan: plan,
    };
    await db('account').insert(data);
    return data;
};

// when the item exist only in account table you can directly call if not use the table name before
exports.get = async function (id) {
    const data = await db('account')
        .select(
            'account.id',
            'account.created_at',
            'stripe_customer_id',
            'stripe_subscription_id',
            'plan',
            'active',
            'users.email as owner_email',
            'account_users.username',
        )
        .join('account_user', 'account_user.account_id', 'account.id')
        .join('users', 'account_user.user_id', 'users.id')
        .where({ 'account.id': id, permission: 'owner' });

    return id ? data[0] : false;
};

exports.users = async function (id) {
    const data = await db('account_user')
        .select('user_id')
        .where({ account_id: id });
    return id ? data : false;
};

exports.update = async function (account_id, data) {
    return await db('account').update(data).where({ id: account_id });
};

exports.delete = async function(id) {
    const data = id ? await db('account').del().where('id', id) : false
    return id ? data : null;
}
