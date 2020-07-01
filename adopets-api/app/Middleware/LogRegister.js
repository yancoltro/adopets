'use strict'

const Logger = use('Logger')

class LogRegister {

  /**
   * This middleware was created for the purpose of logging the application logs. 
   * In order to reuse code, since all requests must be recorded in the system log file,
   * I applied this design pattern, 
   * preventing the writing of redundant code in the controllers' methods 
   * and facilitating the maintenance of the system
   */

  async handle({ request, response, auth }, next) {
    var user_uuid = 'no user loged in'
    var user_name = 'no user loged in'
    var user_email = 'no user loged in'
    var req_res_identifier = new Date();
    var payload = request.all()
    if (auth.user) {
      user_uuid = auth.user.uuid
      user_name = auth.user.name
      user_email = auth.user.email
    }
    if (request.url() == '/login' || request.url() == '/register') {
      const user = request.only(['email'])
      payload = 'the data of this request cannot be registered because they have passwords --- ' +
        'user: ' + user.email + ' realized new ' + request.url()
    }
    Logger.info('[REQUEST] request_id{ %s } - new request details to url %s: ' +
      '\npayload: %s ' +
      '\nmethod: %s ' +
      '\nuser_agent: %s ' +
      '\nip: %s' +
      '\nuser-uuid: %s' +
      '\nuser-name: %s' +
      '\nuser-email: %s',
      req_res_identifier,
      request.url(),
      payload,
      request.method(),
      request.headers()['user-agent'],
      request.ip(),
      user_uuid,
      user_name,
      user_email)

    await next()
  
    Logger.info('[RESPONSE] to request_id{ %s } - new response details - statusCode:%s',
      req_res_identifier,
      response.response.statusCode,
      
    ) 
  }
}

module.exports = LogRegister
