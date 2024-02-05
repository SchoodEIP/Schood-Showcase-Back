/**
 * @memberof module:router~mainRouter~projectRouter
 * @inner
 * @namespace project
 */

const Logger = require('../../services/logger')
const { Project, validateRegister } = require('../../models/project')

/**
 * Main postProject function
 * @name POST /project
 * @function
 * @memberof module:router~mainRouter~projectRouter~project
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

    if (req.body.contacts) {
      req.body.contacts.forEach(contact => {
        if (!contact.type || !contact.contact) {
          return res.status(400).json({ message: 'Invalid request' })
        }
      });
    }
    
    const project = new Project({
      name: req.body.name,
      description: req.body.description,
      contacts: req.body.contacts
    })

    await project.save();

    // Send project
    return res.status(200).json(project)
  } catch (error) /* istanbul ignore next */ {
    Logger.error(error)
    return res.status(500).json({ message: 'Internal Server Error' })
  }
}
