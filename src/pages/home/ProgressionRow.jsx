import ProgressionCard from '../../components/progression/ProgressionCard'

export default function ProgressionRow() {
  return (
    <div className="flex gap-2 w-full">
      <ProgressionCard category="environment" />
      <ProgressionCard category="work" />
      <ProgressionCard category="fitness" />
    </div>
  )
}
