import { convertTextToHtml } from '@/lib/utils'

type TextContentProps = {
	content: string
}

export const TextContent = ({ content }: TextContentProps) => {
	return (
		<article className='prose prose-sm !max-w-none text-primary/50 leading-6'>
			<div dangerouslySetInnerHTML={{ __html: convertTextToHtml(content) }} />
		</article>
	)
}
