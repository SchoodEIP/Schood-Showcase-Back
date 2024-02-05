/**
 * @memberof module:router~mainRouter~teamRouter
 * @inner
 * @namespace team
 */

const Logger = require('../../services/logger')
const { Team, validateRegister } = require('../../models/team')

/**
 * Main postTeam function
 * @name POST /team
 * @function
 * @memberof module:router~mainRouter~teamRouter~team
 * @inner
 * @async
 * @param {Object} req
 * @param {Object} res
 * @returns 200 if OK and return access token and role name
 * @returns 500 if Internal Server Error
 */
module.exports = async (req, res) => {
  try {
    // Verif received data
    const { error } = validateRegister(req.body)
    if (error) {
      return res.status(400).json({ message: 'Invalid request' })
    }
    
    const team = new Team({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        picture: req.body.picture,
        role: req.body.role,
        description: req.body.description,
    })

    await team.save();

    // Send team
    return res.status(200).json(team)
  } catch (error) /* istanbul ignore next */ {
    Logger.error(error)
    return res.status(500).json({ message: 'Internal Server Error' })
  }
}
