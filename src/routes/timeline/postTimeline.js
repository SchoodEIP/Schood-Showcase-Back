/**
 * @memberof module:router~mainRouter~timelineRouter
 * @inner
 * @namespace timeline
 */

const Logger = require('../../services/logger')
const { Timeline, validateRegister } = require('../../models/timeline')

/**
 * Main postTimeline function
 * @name POST /timeline
 * @function
 * @memberof module:router~mainRouter~timelineRouter~timeline
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
    
    const timeline = new Timeline({
        date: req.body.date,
        description: req.body.description,
        newFeatures: req.body.newFeatures
    })

    await timeline.save();

    // Send timeline
    return res.status(200).json(timeline)
  } catch (error) /* istanbul ignore next */ {
    Logger.error(error)
    return res.status(500).json({ message: 'Internal Server Error' })
  }
}
