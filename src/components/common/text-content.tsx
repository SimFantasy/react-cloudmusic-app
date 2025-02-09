import { convertTextToHtml } from '@/lib/utils'

type TextContentProps = {
	content: string
}

export const TextContent: React.FC<TextContentProps> = ({ content }) => {
	return (
		<article className='prose prose-sm !max-w-none text-primary/50 leading-6'>
			<div dangerouslySetInnerHTML={{ __html: convertTextToHtml(content) }} />
		</article>
	)
}
