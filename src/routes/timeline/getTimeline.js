/**
 * @memberof module:router~mainRouter~timelineRouter
 * @inner
 * @namespace timeline
 */

const Logger = require('../../services/logger')
const { Timeline } = require('../../models/timeline')

/**
 * Main getTimeline function
 * @name GET /timeline
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
    const timeline = await Timeline.find({})

    // Send timeline
    return res.status(200).json(timeline)
  } catch (error) /* istanbul ignore next */ {
    Logger.error(error)
    return res.status(500).json({ message: 'Internal Server Error' })
  }
}
