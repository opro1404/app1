import Card from '../../components/ui/Card'
import WeeklyChart from '../../components/charts/WeeklyChart'

export default function WeeklyBar() {
  return (
    <Card className="p-4">
      <div className="flex items-center justify-between mb-4">
        <p className="text-white font-bold text-sm">This Week</p>
        <span className="text-orange text-xs font-bold">7-day view</span>
      </div>
      <WeeklyChart />
    </Card>
  )
}
