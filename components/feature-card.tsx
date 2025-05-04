import type { ReactNode } from "react"

interface FeatureCardProps {
  icon: ReactNode
  title: string
  description: string
  color: string
}

export default function FeatureCard({ icon, title, description, color }: FeatureCardProps) {
  return (
    <div
      className="p-6 border-4 border-black rounded-lg shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all hover:-translate-y-2 hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]"
      style={{ backgroundColor: color }}
    >
      <div className="bg-white w-16 h-16 rounded-full border-4 border-black flex items-center justify-center mb-4">
        <div className="w-8 h-8">{icon}</div>
      </div>
      <h3 className="text-xl font-bold mb-2 text-black">{title}</h3>
      <p className="text-black">{description}</p>
    </div>
  )
}
