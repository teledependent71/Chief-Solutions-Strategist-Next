import React from 'react'
import Head from 'next/head'

import { DataProvider, Repeater } from '@teleporthq/react-components'
import ReactMarkdown from 'react-markdown'
import PropTypes from 'prop-types'

import postsPageInitialPaths22ffbResource from '../../resources/posts-page-initial-paths-22ffb'
import postsPageInitialProps89a58Resource from '../../resources/posts-page-initial-props-89a58'

const Posts = (props) => {
  return (
    <>
      <div className="posts-container">
        <Head>
          <title>Posts - Chief Solutions Strategist</title>
          <meta
            property="og:title"
            content="Posts - Chief Solutions Strategist"
          />
        </Head>
        <DataProvider
          renderSuccess={(PostsEntity) => (
            <>
              <div className="posts-container1">
                <h1>{PostsEntity?.Title}</h1>
                <span>{PostsEntity?.Preview}</span>
                <span>{PostsEntity?.slug}</span>
                <div className="posts-container2">
                  <ReactMarkdown>{PostsEntity?.Content}</ReactMarkdown>
                </div>
              </div>
            </>
          )}
          initialData={props.postsEntity}
          persistDataDuringLoading={true}
          key={props?.postsEntity?.id}
        />
      </div>
      <style jsx>
        {`
          .posts-container {
            width: 100%;
            display: flex;
            overflow: auto;
            min-height: 100vh;
            align-items: center;
            flex-direction: column;
          }
          .posts-container1 {
            gap: 12px;
            width: 100%;
            display: flex;
            flex-direction: column;
          }
          .posts-container2 {
            width: 100%;
            align-self: stretch;
          }
        `}
      </style>
    </>
  )
}

Posts.defaultProps = {
  postsEntity: [],
}

Posts.propTypes = {
  postsEntity: PropTypes.array,
}

export default Posts

export async function getStaticPaths() {
  try {
    const response = await postsPageInitialPaths22ffbResource({})
    return {
      paths: (response?.data || []).map((item) => {
        return {
          params: {
            id: (item?.id).toString(),
          },
        }
      }),
      fallback: 'blocking',
    }
  } catch (error) {
    return {
      paths: [],
      fallback: 'blocking',
    }
  }
}

export async function getStaticProps(context) {
  try {
    const response = await postsPageInitialProps89a58Resource({
      ...context?.params,
    })
    if (!response?.data?.[0]) {
      return {
        notFound: true,
      }
    }
    return {
      props: {
        postsEntity: response?.data?.[0],
        ...response?.meta,
      },
      revalidate: 60,
    }
  } catch (error) {
    return {
      notFound: true,
    }
  }
}
