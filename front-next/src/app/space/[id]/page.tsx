import SpaceDetailPage from '@/pages/space-detail/ui/space-detail-page'

interface SpaceDetailProps {
  params: Promise<{
    id: string
  }>
}

export default async function SpaceDetail({ params }: SpaceDetailProps) {
  const { id } = await params
  const spaceId = Number.parseInt(id)

  return <SpaceDetailPage spaceId={spaceId} />
}
