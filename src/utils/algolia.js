// Versão 2
const postQuery = `{
    posts: allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/content/blog/" } }
    ) {
      edges {
        node {
          objectID: id
          frontmatter {
            title            
            date(formatString: "MMM D, YYYY")
            description            
          }
          fields {
              slug
          }
          excerpt(pruneLength: 5000)
        }
      }
    }
  }`

//Algolia utils
// const blogQuery = `
//  {
//   allMarkdownRemark {
//     nodes {
//       frontmatter {
//         date
//         title
//         description
//       }
//       html
//       excerpt
//     }
//   }
// }

// `

// Versão 1
// const unnestFrontmatter = node => {
//   const { frontmatter, ...rest } = node

//   return {
//     ...frontmatter,
//     ...rest,
//   }
// }

// const queries = [
//   {
//     query: postQuery,
//     transformer: ({ data }) =>
//       data.posts.edges.map(edge => edge.node).map(unnestFrontmatter),
//   },
// ]

//Versão 2

const flatten = arr =>
  arr.map(({ node: { frontmatter, ...rest } }) => ({
    ...frontmatter,
    ...rest,
  }))
const settings = { attributesToSnippet: [`excerpt:20`] }

const queries = [
  {
    query: postQuery,
    transformer: ({ data }) => flatten(data.posts.edges),
    settings,
  },
]

module.exports = queries
