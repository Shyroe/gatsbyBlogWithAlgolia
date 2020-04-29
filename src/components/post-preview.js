import React from "react"
import { rhythm } from "../utils/typography"
import { Highlight } from "react-instantsearch-dom"
import { Link } from "gatsby"

const PostPreview = ({ hit }) => {
  return (
    <article>
      <header>
        <h3
          style={{
            marginBottom: rhythm(1 / 4),
          }}
        >
          <Link style={{ boxShadow: `none` }} to={hit.slug}>
            <Highlight hit={hit} attribute="title" tagName="mark" />
          </Link>
        </h3>
        <small>{hit.date}</small>
      </header>
      <section>
        {/* <p
          dangerouslySetInnerHTML={{
            __html: hit.description || hit.excerpt,
          }}
        /> */}
        <p>
          <Highlight hit={hit} attribute="excerpt" tagName="mark" />
        </p>
      </section>
    </article>
  )
}

export default PostPreview
