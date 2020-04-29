import React from "react"
import { Link, graphql } from "gatsby"

import algoliasearch from "algoliasearch/lite"

import { InstantSearch, SearchBox, Hits } from "react-instantsearch-dom"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import PostPreview from "../components/post-preview"
import { rhythm } from "../utils/typography"

const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title
  const posts = data.allMarkdownRemark.edges

  // Algolia obj
  const algolia = {
    appId: process.env.ALGOLIA_APP_ID,
    apiKey: process.env.ALGOLIA_API_KEY,
    indexName: process.env.ALGOLIA_INDEX_NAME,
  }

  console.log("Algolia in Index Page: ", algolia)

  //Run algoliasearch
  // algoliasearch(algolia.appId, algolia.apiKey)
  const searchClient = () => algoliasearch(algolia.appId, algolia.apiKey)

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="All posts" />
      <Bio />
      <InstantSearch searchClient={searchClient} indexName={algolia.indexName}>
        <SearchBox />
        <Hits hitComponent={PostPreview} />
      </InstantSearch>
    </Layout>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            description
          }
        }
      }
    }
  }
`
