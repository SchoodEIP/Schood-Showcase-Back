/**
 * @memberof module:router~mainRouter~teamRouter
 * @inner
 * @namespace team
 */

const Logger = require('../../services/logger')
const { Team, validatePatch } = require('../../models/team')

/**
 * Main patchTeam function
 * @name PATCH /team
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
    const id = req.params.id
    const { error } = validatePatch(req.body)
    if (error) {
      return res.status(400).json({ message: 'Invalid request' })
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid request' })
    }

    const team = await Team.findById(id)
    if (!team) {
      return res.status(400).json({ message: 'Invalid request' })
    }

    team.firstname = req.body.firstname ? req.body.firstname : team.firstname
    team.lastname = req.body.lastname ? req.body.lastname : team.lastname
    team.picture = req.body.picture ? req.body.picture : team.picture
    team.role = req.body.role ? req.body.role : team.role
    team.description = req.body.description ? req.body.description : team.description

    await team.save()

    // Send team
    return res.status(200).json(team)
  } catch (error) /* istanbul ignore next */ {
    Logger.error(error)
    return res.status(500).json({ message: 'Internal Server Error' })
  }
}
