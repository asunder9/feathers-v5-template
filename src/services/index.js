import { user } from './users/users.js'
import { door } from './doors/doors.js'
import { hardware } from './hardwares/hardwares.js'

export const services = (app) => {
  app.configure(user)
  app.configure(door)
  app.configure(hardware)
  // All services will be registered here
}
