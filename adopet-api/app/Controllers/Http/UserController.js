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
    /**
     * This method provide functionality for logout user
     * due to scope of this project, use api method for login, because this methos allow login and logout
     */
    async logout({auth}){
        const apiToken = auth.getAuthHeader()

        await auth
          .authenticator('api')
          .revokeTokens([apiToken])
        
        return {"":""}
    }
}

module.exports = UserController
