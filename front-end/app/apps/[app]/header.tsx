import { StatusBadge } from "@/components/status-badge"

export function AppHeader({
  params,
  app,
}: {
  params: { app: string }
  app: { status: string }
}) {
  return (
    <div className="flex justify-between items-end p-5">
      <h1 className="text-4xl font-bold">{params.app}</h1>
      <StatusBadge status={app.status} />
    </div>
  )
}
