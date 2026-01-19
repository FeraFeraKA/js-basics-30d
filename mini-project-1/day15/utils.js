export function getStatus(status) {
  if (status === "idle") return ""
  if (status === "loading") return "Загрузка..."
  if (status === "error") return "Произошла ошибка: "
  if (status === "success") return "Загрузка завершена"
}