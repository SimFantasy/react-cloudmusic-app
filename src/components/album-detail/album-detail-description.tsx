import { TextContent } from '@/components/common/text-content'

type AlbumDetailDescriptionProps = {
	desc?: string
}

export const AlbumDetailDescription = ({ desc }: AlbumDetailDescriptionProps) => {
	return <TextContent content={desc || '暂无描述信息'} />
}
