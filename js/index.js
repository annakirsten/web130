// required js for Bootstrap
import * as $ from 'jquery';
import * as popper from 'popper.js';
import * as bootstrap from 'bootstrap';
export { $, popper, bootstrap }


import { renderCats } from './cats'
import { getArticles, getArticle } from './articles'
import { renderNav } from './nav'
import { renderLoginForm } from './loginForm'
import { renderArticleForm } from './articleForm'
import { Category } from './categories'


//renderCats()
renderNav()

let page = window.location.href.split('#')[1]
let id

if (page && page.startsWith('Article_')) {
    id = page.split('_')[1]
    page = 'Article'
}

console.log('Rendering page...', page)

switch (page) {
    case 'Home':
        getArticles()
        break
    case 'Login':
        renderLoginForm()
        break
    case 'Article':
        getArticle(id)
        break;
    case 'ArticleForm':
        renderArticleForm()
        break
    case Category.Corporate:
        getArticles(Corporate)
        break
    case Category.NorthAmerica:
        getArticles(NorthAmerica)
        break
    case Category.Europe:
        getArticles(Europe)
        break
    case Category.Asia:
        getArticles(Asia)
        break
    case Category.Oceania:
        getArticles(Oceania)
        break
    case Category.SouthAmerica:
        getArticles(SouthAmerica)
        break
    case Category.Africa:
        getArticles(Africa)
        break
    case Category.Inspiration:
        getArticles(Inspiration)
        break
    default:
        getArticles()
}

//reload window on back button
$(window).on('popstate', function() {
    location.reload(true);
 });