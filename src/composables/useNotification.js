const show = ref(false)
const message = ref('')
const color = ref('success')
const timeout = ref(5000)

export default function useNotification() {
  function setNotification(msg, type, duration = 5000) {
    message.value = msg
    color.value = type
    timeout.value = duration
    show.value = true
  }

  const success = (msg, duration) => setNotification(msg, 'success', duration)
  const warning = (msg, duration) => setNotification(msg, 'warning', duration)
  const error = (msg, duration) => setNotification(msg, 'error', duration)
  const info = (msg, duration) => setNotification(msg, 'info', duration)

  return {
    success,
    warning,
    error,
    info,
    show,
    message,
    color,
    timeout,
  }
}
