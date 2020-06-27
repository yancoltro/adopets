'use strict'

const User = use('App/Models/User')

class UserController {
    /**
     * This methos register a new user in database
     */
    async register({request}){
        const data = request.only(['name', 'email', 'password'])
        const user = await User.create(data)
        return user
    }

    /**
     * This method provide token for authenticate and login a user
     */
    async login({request, auth}){
        const {email, password} = request.all()
        const token = await auth.attempt(email, password)
        return token
    }   

    async logout({auth}){
       const token = auth.getAuthHeader()
       return token
    }
}

module.exports = UserController
