import moment from 'moment'

export function parseData(event) {
  if (!event)
    return event
  const matchDay = moment(event.date).format('DD/MM/YYYY')
  const isFull = event?.joined >= event?.maximum

  return {
    ...event,
    matchDay,
    isFull,
  }
}
