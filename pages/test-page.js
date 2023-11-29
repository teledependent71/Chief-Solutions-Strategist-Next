import React from 'react'
import Head from 'next/head'

import { DataProvider, Repeater } from '@teleporthq/react-components'

import authorsResource from '../resources/authors'

const TestPage = (props) => {
  return (
    <>
      <div className="test-page-container">
        <Head>
          <title>test-page - Chief Solutions Strategist</title>
          <meta
            property="og:title"
            content="test-page - Chief Solutions Strategist"
          />
        </Head>
        <DataProvider
          renderSuccess={(context_hqt5m) => (
            <>
              <h1>{context_hqt5m?.Name}</h1>
            </>
          )}
          initialData={props.contextHqt5mProp}
          persistDataDuringLoading={true}
          key={props?.contextHqt5mProp?.id}
        />
      </div>
      <style jsx>
        {`
          .test-page-container {
            width: 100%;
            display: flex;
            overflow: auto;
            min-height: 100vh;
            align-items: center;
            flex-direction: column;
          }
        `}
      </style>
    </>
  )
}

export default TestPage

export async function getStaticProps(context) {
  try {
    const contextHqt5mProp = await authorsResource({
      ...context?.params,
    })
    return {
      props: {
        contextHqt5mProp: contextHqt5mProp?.data?.[0],
      },
      revalidate: 60,
    }
  } catch (error) {
    return {
      notFound: true,
    }
  }
}
