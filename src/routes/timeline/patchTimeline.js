/**
 * @memberof module:router~mainRouter~timelineRouter
 * @inner
 * @namespace timeline
 */

const Logger = require('../../services/logger')
const { default: mongoose } = require('mongoose')
const { Timeline, validatePatch } = require('../../models/timeline')

/**
 * Main patchTimeline function
 * @name PATCH /timeline
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
    const id = req.params.id
    const { error } = validatePatch(req.body)
    if (error) {
      return res.status(400).json({ message: 'Invalid request' })
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Invalid request' })
    }
    
    const timeline = await Timeline.findById(id)
    if (!timeline) {
        return res.status(400).json({ message: 'Invalid request' })
    }

    timeline.date = req.body.date ? req.body.date : timeline.date
    timeline.description = req.body.description ? req.body.description : timeline.description
    timeline.newFeatures = req.body.newFeatures ? req.body.newFeatures : timeline.newFeatures

    await timeline.save();

    // Send timeline
    return res.status(200).json(timeline)
  } catch (error) /* istanbul ignore next */ {
    Logger.error(error)
    return res.status(500).json({ message: 'Internal Server Error' })
  }
}
