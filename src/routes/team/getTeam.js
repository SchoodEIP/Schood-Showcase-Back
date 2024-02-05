/**
 * @memberof module:router~mainRouter~teamRouter
 * @inner
 * @namespace team
 */

const Logger = require('../../services/logger')
const { Team } = require('../../models/team')

/**
 * Main getTeam function
 * @name GET /team
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
    const team = await Team.find({})

    // Send team
    return res.status(200).json(team)
  } catch (error) /* istanbul ignore next */ {
    Logger.error(error)
    return res.status(500).json({ message: 'Internal Server Error' })
  }
}
