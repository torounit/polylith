'use strict';

const dirname = function( path ) {
	return path.replace( /\\/g, '/' ).replace( /\/[^\/]*$/, '' );
};
const themeDir = dirname( location.pathname );

const CACHE_NAME = 'cache-v1';
const urlsToCache = [
	'/',
	themeDir + '/style.css?ver=1.0.0',
	themeDir + '/module.js',
	themeDir + '/app/components/Contents.js',
	themeDir + '/app/components/Post.js',
	themeDir + '/app/components/Posts.js',
	themeDir + '/app/components/SiteName.js',
	themeDir + '/app/lib/api.js',
	themeDir + '/app/lib/route.js',
	themeDir + '/app/lib/state.js',
	'/wp-includes/js/jquery/jquery.js?ver=1.12.4',
	'/wp-includes/js/jquery/jquery-migrate.min.js?ver=1.4.1',
	'/wp-includes/js/underscore.min.js?ver=1.8.3',
	'/wp-includes/js/backbone.min.js?ver=1.2.3',
	'/wp-includes/js/api-request.min.js?ver=4.9.5',
	'/wp-includes/js/wp-api.min.js?ver=4.9.5',
	'/wp-includes/js/wp-embed.min.js?ver=4.9.5'
];


self.addEventListener( 'install', ( event ) => {
	event.waitUntil(
		caches.open( CACHE_NAME )
			.then( ( cache ) => {
				console.log( 'Opened cache' );
				return cache.addAll( urlsToCache );
			} )
	);
} );

self.addEventListener( 'activate', ( event ) => {
	let cacheWhitelist = [ CACHE_NAME ];
	event.waitUntil(
		caches.keys().then( ( cacheNames ) => {
			return Promise.all(
				cacheNames.map( ( cacheName ) => {
					// ホワイトリストにないキャッシュ(古いキャッシュ)は削除する
					if (cacheWhitelist.indexOf( cacheName ) === - 1) {
						return caches.delete( cacheName );
					}
				} )
			);
		} )
	);
} );

self.addEventListener( 'fetch', ( event ) => {
	console.log( event )
	event.respondWith(
		caches.match( event.request )
			.then( ( response ) => {
				if (response) {
					return response;
				}

				// 重要：リクエストを clone する。リクエストは Stream なので
				// 一度しか処理できない。ここではキャッシュ用、fetch 用と2回
				// 必要なので、リクエストは clone しないといけない
				let fetchRequest = event.request.clone();
				console.log( fetchRequest )
				return fetch( fetchRequest )
					.then( ( response ) => {
						if (! response || response.status !== 200 || response.type !== 'basic') {
							return response;
						}

						// 重要：レスポンスを clone する。レスポンスは Stream で
						// ブラウザ用とキャッシュ用の2回必要。なので clone して
						// 2つの Stream があるようにする
						let responseToCache = response.clone();

						caches.open( CACHE_NAME )
							.then( ( cache ) => {
								cache.put( event.request, responseToCache );
							} );

						return response;
					} );
			} )
	);
} );
