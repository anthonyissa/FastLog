export type App = {
  id: string
  status_threshold: number
  name: string
  status: "UP" | "DOWN",
  user: string
}
