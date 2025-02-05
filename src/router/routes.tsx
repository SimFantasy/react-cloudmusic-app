import { lazy } from 'react'
import { RouteObject, Navigate } from 'react-router'
import { LazyComponent } from '@/router/lazy-component'
import { ErrorBoundary } from '@/router/error-boundary'
import { protectedLoader } from '@/router/loader'

export const routes: RouteObject[] = [
	{
		path: '/',
		element: (
			<LazyComponent lazyElement={lazy(() => import('@/layouts/base-layout'))} title='Layout' />
		),
		errorElement: <ErrorBoundary />,
		children: [
			{
				index: true,
				element: <Navigate to='/discover' />
			},
			{
				path: 'discover',
				element: (
					<LazyComponent lazyElement={lazy(() => import('@/views/discover'))} title='发现' />
				),
				loader: protectedLoader
			},
			{
				path: 'playlist',
				element: (
					<LazyComponent lazyElement={lazy(() => import('@/views/playlist'))} title='歌单' />
				),
				loader: protectedLoader
			},
			{
				path: 'playlist/:playlistId',
				element: (
					<LazyComponent
						lazyElement={lazy(() => import('@/views/playlist-detail'))}
						title='歌单详情'
					/>
				),
				loader: protectedLoader
			},
			{
				path: 'toplist',
				element: <LazyComponent lazyElement={lazy(() => import('@/views/toplist'))} title='榜单' />,
				loader: protectedLoader
			},
			{
				path: 'artist',
				element: <LazyComponent lazyElement={lazy(() => import('@/views/artist'))} title='歌手' />,
				loader: protectedLoader
			},
			{
				path: 'artist/:artistId',
				element: (
					<LazyComponent
						lazyElement={lazy(() => import('@/views/artist-detail'))}
						title='歌手详情'
					/>
				),
				loader: protectedLoader
			},
			{
				path: 'album',
				element: <LazyComponent lazyElement={lazy(() => import('@/views/album'))} title='专辑' />,
				loader: protectedLoader
			},
			{
				path: 'album/:albumId',
				element: (
					<LazyComponent
						lazyElement={lazy(() => import('@/views/album-detail'))}
						title='专辑详情'
					/>
				),
				loader: protectedLoader
			},
			{
				path: 'newsong',
				element: (
					<LazyComponent lazyElement={lazy(() => import('@/views/newsong'))} title='新歌速递' />
				),
				loader: protectedLoader
			},
			{
				path: 'search',
				element: <LazyComponent lazyElement={lazy(() => import('@/views/search'))} title='搜索' />,
				loader: protectedLoader
			}
		]
	},
	{
		path: '*',
		element: (
			<LazyComponent lazyElement={lazy(() => import('@/views/not-found'))} title='404 页面未找到' />
		)
	}
]
