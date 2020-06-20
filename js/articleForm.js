import * as $ from 'jquery'

import { Category } from './categories'
import { getArticles } from './articles'

export function renderArticleForm(data = { content: {}}) {
    const content = $('#content')

    const articleFormHtml = `
        <div class="row justify-content-center">
            <div class="col-lg-10">
                <h2 class="pt-4 mb-3">Add an article</h2>
                <p>Add your article content below! <em>Note: The title of the article must be unique.</em></p>
                <form id="article-form">
                    <input type="hidden" name="id" id="id" value="${data.id || ''}">
                    <div class="form-group">
                        <label for="title">Title</label>
                        <input class="form-control" type="text" name="title" id="title" value="${data.title || ''}">
                    </div>
                    <div class="form-group">
                        <label for="category">Category</label>
                        <select class="form-control" name="category" id="category">
                            ${renderCategoryOptions(data)}
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="content_html">Article Content</label>
                        <textarea class="form-control" name="content_html" id="content_html">${data.content.html || ''}</textarea>
                    </div>
                    <div class="form-group">
                        <label for="source">Source</label>
                        <input class="form-control" type="text" name="source" id="source" value="${data.source || ''}">
                    </div>
                    <button id="article-submit" class="btn btn-primary" type="submit">Submit</button>
                </form>
            </div>
        </div>
    `

    content.html(articleFormHtml)

    CKEDITOR.replace('content_html')

    $('#article-submit').on('click', (event) => {
        event.preventDefault()
        const title = $('#title').val()
        const category = $("#category").val()
        const content_html = CKEDITOR.instances.content_html.getData()
        const source = $('#source').val()
        const data = {
            title,
            category,
            content_html,
            source
        }
        const token = sessionStorage.getItem('token')

        console.log('Submitting article...', data)

        $.post({
            url: '/api/article',
            headers: {
                'Authorization': `Basic ${token}`
            },
            contentType: 'application/json',
            dataType: 'json',
            data: JSON.stringify(data)
        }).then(response => {
            if (response.status === 'SUCCESS') {
                $('#create-article-success').modal('show')
                $('#continue-editing').on('click', event => {
                    document.getElementById('article-form').reset()
                    CKEDITOR.instances.content_html.setData('')
                })
                $('#go-to-home').on('click', event => {
                    getArticles()
                })
            } else {
                $('#create-article-failure').modal('show')
            }
        }).fail(error => {
            $('#create-article-failure').modal('show')
        })
    })

    // form submit event listeners
}

function renderCategoryOptions(data) {
    let categoryOptionsHtml = ''
    for (const [category, categoryLabel] of Object.entries(Category)) {
        let selected = ''
        if (data.category === category) {
            selected = `selected="selected"`
        }
        categoryOptionsHtml += `
            <option value="${category}" ${selected}>${categoryLabel}</option>
        `
    }
    return categoryOptionsHtml
}
