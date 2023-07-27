import { StatusBadge } from "@/components/status-badge"
import { App } from "@/types/App"

export function AppHeader({
  app,
}: {
  app: App 
}) {
  return (
    <div className="flex justify-between items-end p-5">
      <h1 className="text-4xl font-bold">{app.name}</h1>
      <StatusBadge status={app.status} />
    </div>
  )
}
