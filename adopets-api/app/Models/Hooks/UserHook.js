'use strict'

const { v4: uuidv4 } = require('uuid');
const Hash = use('Hash')

const UserHook = exports = module.exports = {}

/**
 * A boilerplate not to forget how to make a hook in this version rsrs
 * 
 * UserHook.method = async (modelInstance) => {}
 * 
**/

UserHook.hashPassword = async (user) => {
    user.password = await Hash.make(user.password)
}

UserHook.uuid = async (user) => {
    user.uuid = uuidv4();
}
