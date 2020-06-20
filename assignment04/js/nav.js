import * as $ from 'jquery'

import { Category } from './categories'
import { getArticles } from './articles'
import { renderLoginForm, logout } from './loginForm'
import { renderArticleForm } from './articleForm'

export function renderNav() {
    // home links
    $('a[href="#Home"]').on('click', function() {
        getArticles()
    })

    // category links
    renderCategoryDropdown()

    // editor links
    $('a[href="#Login"]').on('click', function() {
        renderLoginForm()
    })
    $('a[href="#Logout"]').on('click', function() {
        logout()
    })
    $('a[href="#ArticleForm"]').on('click', function() {
        renderArticleForm()
    })

    // active classes for styling of nav bar items
    $('.nav-link').on('click', function(event) {
        $('.nav-link').removeClass('active')
        const thisNavItem = $(event.target)
        thisNavItem.addClass('active')
    })

    // render logged in user nav if token is set
    if (sessionStorage.getItem('token')) {
        $('.auth-user').css('display', 'block')
        $('.user').css('display', 'none')
    }
}

function renderCategoryDropdown() {
    const categoryMenuItems = $('#category-menu-items')
    for (const [categoryLink, categoryLabel] of Object.entries(Category)) {
        const categoryItemHtml = `
            <a class="dropdown-item" href="#${categoryLink}">${categoryLabel}</a>
        `
        // category = "World"
        // <a class="dropdown-item" href="#World">World</a>
        categoryMenuItems.append(categoryItemHtml)
    }

    categoryMenuItems.find('a').on('click', function(event) {
        let clickedEl = $(event.target)
        let category = clickedEl.attr('href').replace('#', '')
        if (Category.hasOwnProperty(category)) {
            getArticles(category)
        }
    })
}