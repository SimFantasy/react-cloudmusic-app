import { Titlebar } from '@/components/common/titlebar'
import { ToplistDetailList } from '@/components/toplist/toplist-detail-list'
import { ToplistList } from '@/components/toplist/toplist-list'

import { useToplists, useToplistDetail } from '@/service/queries/toplist'

import { TOPLIST_CATEGORY } from '@/config'
import { filterToplist, filterOtherToplist } from '@/lib/utils'

const Toplist: React.FC = () => {
	const { data, loading } = useToplists()
	const { data: detailData, loading: detailLoading } = useToplistDetail()
	return (
		<div className='page-wrapper page-content'>
			<div className='page-block'>
				<Titlebar title='官方榜单' />
				<ToplistDetailList
					toplists={filterToplist(detailData!, TOPLIST_CATEGORY.official)}
					loading={detailLoading}
				/>
			</div>

			<div className='page-block'>
				<Titlebar title='精选榜' />
				<ToplistList toplists={filterToplist(data!, TOPLIST_CATEGORY.chosen)} loading={loading} />
			</div>

			<div className='page-block'>
				<Titlebar title='曲风榜' />
				<ToplistList toplists={filterToplist(data!, TOPLIST_CATEGORY.genre)} loading={loading} />
			</div>

			<div className='page-block'>
				<Titlebar title='全球榜' />
				<ToplistList
					toplists={filterToplist(data!, TOPLIST_CATEGORY.global)}
					loading={loading}
					p={0}
				/>
			</div>

			<div className='page-block'>
				<Titlebar title='语种榜' />
				<ToplistList toplists={filterToplist(data!, TOPLIST_CATEGORY.language)} loading={loading} />
			</div>

			<div className='page-block'>
				<Titlebar title='特色榜' />
				<ToplistList toplists={filterToplist(data!, TOPLIST_CATEGORY.feature)} loading={loading} />
			</div>

			<div className='page-block'>
				<Titlebar title='VIP榜' />
				<ToplistList toplists={filterToplist(data!, TOPLIST_CATEGORY.vip)} loading={loading} />
			</div>

			<div className='page-block'>
				<Titlebar title='合伙人榜' />
				<ToplistList
					toplists={filterToplist(data!, TOPLIST_CATEGORY.partner)}
					loading={loading}
					p={3}
				/>
			</div>

			<div className='page-block'>
				<Titlebar title='其他榜单' />
				<ToplistList
					toplists={filterOtherToplist(data!, [
						...TOPLIST_CATEGORY.official,
						...TOPLIST_CATEGORY.chosen,
						...TOPLIST_CATEGORY.genre,
						...TOPLIST_CATEGORY.global,
						...TOPLIST_CATEGORY.language,
						...TOPLIST_CATEGORY.feature,
						...TOPLIST_CATEGORY.vip,
						...TOPLIST_CATEGORY.partner
					])}
					loading={loading}
					p={3}
				/>
			</div>
		</div>
	)
}

export default Toplist
