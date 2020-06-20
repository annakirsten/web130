import * as $ from 'jquery'

//import { apiUrl as api } from './env'

const api = 'https://api-us-west-2.graphcms.com/v2/ckag39ybq0gyx01xm314agoh2/master'

export function getArticles(category) {
    let filter = '(orderBy: createdAt_DESC)'
    if (category) {
        filter = `(orderBy: createdAt_DESC, where: {category: ${category}})`
    }
    $.post(api, JSON.stringify({
        operationName: 'GetArticles',
        query: `
        query GetArticles {
            articles${filter} {
                id
                title
                content {
                    html
                }
                category
                createdAt
            }
        }`,
        variables: null
    })).then(function(response) {
        const articles = response.data.articles
        const content = $('#content')

        // print to console for debugging
        console.log(articles);

        let articleListHtml = '<div class="row">'

        articles.forEach((article, index) => {
            const date = new Date(article.createdAt)
            const dateString = `
                ${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}
            `
            
            articleListHtml += `
                <article class="col-lg-4 col-md-6 col-sm-12 list">
                    <div class="article-section">
                        <h3><a class="article-link" href="#Article_${article.id}">${article.title}</a></h3>
                        <small>Published: ${dateString}</small>
                        <section class="article-content mt-1">
                            ${article.content.html}
                        </section>
                        <a class="btn btn-primary article-link" href="#Article_${article.id}" role="button">Keep reading &nbsp;<i class="fa fa-caret-right"></i></a>
                    </div>
                </article>
            `
        })

        articleListHtml += '</div>'

        content.html(articleListHtml)

        $('.article-link').on('click', (event) => {
            const link = $(event.target)
            const id = link.attr('href').split('_')[1]
            getArticle(id)
        })
    })
}

export function getArticle(id) {
    $.post(api, JSON.stringify({
        operationName: 'GetArticle',
        query: `
        query GetArticle($id: ID) {
            article(where: {id: $id}) {
                id
                title
                content {
                    html
                }
                category
                source
                createdAt
            }
        }`,
        variables: {
            id: id
        }
    })).then(function(response) {
        const article = response.data.article
        const content = $('#content')

        // print to console for debugging
        console.log(article);

        const date = new Date(article.createdAt)
        const dateString = `
            ${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}
        `

        const articleHtml = `
            <div class="row">
                <article class="article-single container col-10 offset-1">
                    <h2>${article.title}</h2>
                    <div class="row">
                        <div class="col-6 text-left">
                            Published: ${dateString}
                        </div>
                        <div class="col-6 text-right">
                            <a href="#Home">Go to Home &nbsp;<i class="fa fa-caret-right"></i></a>
                        </div>
                    </div>
                    <hr />
                    <section>
                        ${article.content.html}
                    </section>
                    <p><a href="${article.source}" target="_blank">SOURCE &nbsp;<i class="fa fa-caret-right"></i></a></p>
                </article>
            </div>
        `

        content.html(articleHtml)
    })
}