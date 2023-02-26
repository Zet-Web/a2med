import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import { YMaps } from '@pbe/react-yandex-maps'

import Head from 'next/head'
import { Layout } from 'components'

import { YANDEX_API_KEY } from 'shared/constants'
import { store } from 'store'

import 'styles/globals.scss'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>A2MED Clinic</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Provider store={store}>
        <YMaps query={{ apikey: YANDEX_API_KEY }}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </YMaps>
      </Provider>
    </>
  )
}

export default MyApp
