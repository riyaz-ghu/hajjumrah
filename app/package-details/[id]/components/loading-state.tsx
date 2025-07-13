import { Loader2 } from "lucide-react"

export function LoadingState() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-center">
        <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-green-700" />
        <p className="text-gray-600">Loading package details...</p>
      </div>
    </div>
  )
}
