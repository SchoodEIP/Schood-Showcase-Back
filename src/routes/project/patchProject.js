/**
 * @memberof module:router~mainRouter~projectRouter
 * @inner
 * @namespace project
 */

const Logger = require('../../services/logger')
const { default: mongoose } = require('mongoose')
const { Project, validatePatch } = require('../../models/project')

/**
 * Main patchProject function
 * @name PATCH /project
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
    const id = req.params.id
    const { error } = validatePatch(req.body)
    if (error) {
      return res.status(400).json({ message: 'Invalid request' })
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid request' })
    }

    const project = await Project.findById(id)
    if (!project) {
      return res.status(400).json({ message: 'Invalid request' })
    }

    if (req.body.contacts) {
      for (let index = 0; index < req.body.contacts.length; index++) {
        const contact = req.body.contacts[index];
        if (!contact.type || !contact.contact) {
          return res.status(400).json({ message: 'Invalid request' })
        }
      }
    }

    project.name = req.body.name ? req.body.name : project.name
    project.description = req.body.description ? req.body.description : project.description
    project.contacts = req.body.contacts ? req.body.contacts : project.contacts

    await project.save()

    // Send project
    return res.status(200).json(project)
  } catch (error) /* istanbul ignore next */ {
    Logger.error(error)
    return res.status(500).json({ message: 'Internal Server Error' })
  }
}
