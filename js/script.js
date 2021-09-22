// document.getElementById('test-button').addEventListener('click', function(){
//   const links = document.querySelectorAll('.titles a');
//   console.log('links:', links);
// });




  const titleClickHandler = function (event) {
    event.preventDefault();
    const clickedElement = this;   /*pytanie*/
    console.log('Link was clicked!');
    console.log(event);


    /* remove class 'active' from all article links  */
    const activeLinks = document.querySelectorAll('.titles a.active');

    for (let activeLink of activeLinks) {
      activeLink.classList.remove('active');
    }


    /* add class 'active' to the clicked link */
    console.log('clickedElement:', clickedElement);

    clickedElement.classList.add('active');


    /* remove class 'active' from all articles */
    const activeArticles = document.querySelectorAll('.posts .active');

    for (let activeArticle of activeArticles) {
      activeArticle.classList.remove('active');
    }


    /* get 'href' attribute from the clicked link */
    const articleSelector = clickedElement.getAttribute('href');
    console.log(articleSelector);


    /* find the correct article using the selector (value of 'href' attribute) */
    const targetArticle = document.querySelector(articleSelector);
    console.log(targetArticle);


    /* add class 'active' to the correct article */
    targetArticle.classList.add('active');

  };


  // const links = document.querySelectorAll('.titles a');
  // console.log(links);

  // for (let link of links) {
  //   link.addEventListener('click', titleClickHandler);
  // }


  /* ***************************************zadanie 2*******************************************/

  const optArticleSelector = '.post',
    optTitleSelector = '.post-title',
    optTitleListSelector = '.titles',
    optArticleTagsSelector = '.post-tags .list';
    optAuthorsSelector = '.post-author';

function generateTitleLinks(customSelector = ''){

    /* remove contents of titleList */
    const titleList = document.querySelector(optTitleListSelector);
    titleList.innerHTML = '';
    console.log(titleList);


    /* for each article */
    const articles = document.querySelectorAll(optArticleSelector+ customSelector);
    console.log(customSelector);
    let html = '';

    for (let article of articles) {
      // document.querySelector(optArticleSelector);


      /* get the article id */
      const articleId = article.getAttribute('id'); /*86*/
      console.log(articleId);


      /* find the title element */
      // document.querySelectorAll('optTitleListSelector');


      /* get the title from the title element */
      const articleTitle = article.querySelector(optTitleSelector).innerHTML; /*95*/


      /* create HTML of the link */
      const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
      console.log(linkHTML);


      /* insert link into titleList */
      // titleList.insertAdjacentHTML('beforebegin');
      html = html + linkHTML;
    }

    titleList.innerHTML = html;

    const links = document.querySelectorAll('.titles a');
    console.log(links);

    for (let link of links) {
      link.addEventListener('click', titleClickHandler);
    }
  }

  generateTitleLinks();


  /* *********************************************zadanie 3************************************************************ */

  function generateTags() {
    /* find all articles */
    const articles = document.querySelectorAll(optArticleSelector);

    /* START LOOP: for every article: */
    for (let article of articles) {

      /* find tags wrapper */
      const titleList = article.querySelector(optArticleTagsSelector);
      // titleList.innerHTML = '';
      console.log(titleList);


      /* make html variable with empty string */
      let html = '';

      /* get tags from data-tags attribute */
      const articleTags = article.getAttribute('data-tags');
      console.log(articleTags);


      /* split tags into array */
      const articleTagsArray = articleTags.split(' ');
      console.log(articleTagsArray);


      /* START LOOP: for each tag */
      for (let tag of articleTagsArray) {
        console.log(tag);

        /* generate HTML of the link */
        const linkHTML = '<li><a href="#tag-' + tag + '">' + tag + '</a></li>';

        /* add generated code to html variable */
        html = html + linkHTML;

        /* insert HTML of all the links into the tags wrapper*/
        titleList.insertAdjacentHTML('beforeend', linkHTML);
        /* END LOOP: for each tag */
      }
      /* END LOOP: for every article: */
    }
  }

  generateTags();


function tagClickHandler(event){
  /* prevent default action for this event */
  event.preventDefault();

  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;

  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');

    /* make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#tag-', '');

  /* find all tag links with class active */
  const tagLinks = document.querySelectorAll( 'a.active[href^="#tag-"]');

  /* START LOOP: for each active tag link */
  for (let tag of tagLinks) {

    /* remove class active */
    tagLinks.classList.remove('active');

    /* END LOOP: for each active tag link */
  }

  /* find all tag links with "href" attribute equal to the "href" constant */
  const hreflinks = document.querySelectorAll(href);


  /* START LOOP: for each found tag link */
  for (let tag of hreflinks) {

    /* add class active */
    hreflinks.classList.add('active');

    /* END LOOP: for each found tag link */
  }

  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');
}

function addClickListenersToTags() {
  /* find all links to tags */
  const allLinks = document.querySelectorAll('[href^="#tag-"]');

  /* START LOOP: for each link */
  for (let link of allLinks) {

    /* add tagClickHandler as event listener for that link */
    link.addEventListener('click', tagClickHandler);
    console.log('Link was clicked!');

    /* END LOOP: for each link */
  }
}

addClickListenersToTags();
/* *************************************************zadanie 4******************************************************** */


function generateAuthors() {

  /* find all articles */
  const authors = document.querySelectorAll(optArticleSelector);

  /* START LOOP: for every article: */
  for (let author of authors) {

    /* find authors wrapper */
    const authorsList = author.querySelector(optAuthorsSelector);

    /* make html variable with empty string */
    let html = '';

    /* get tags from data-author attribute */
    const articleAuthors = author.getAttribute('data-author');

    /* END LOOP: for every article: */
  }
}

generateAuthors();



function authorClickHandler(event){
  /* prevent default action for this event */
  event.preventDefault();

  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;

  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');

  /* make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#tag-', '');

  /* find all tag links with class active */
  const tagLinks = document.querySelectorAll( 'a.active[href^="#tag-"]');

  /* START LOOP: for each active tag link */
  for (let author of authorsLinks) {

    /* remove class active */
    authorLinks.classList.remove('active');

    /* END LOOP: for each active tag link */
  }

  /* find all tag links with "href" attribute equal to the "href" constant */
  const hreflinks = document.querySelectorAll(href);


  /* START LOOP: for each found tag link */
  for (let author of hreflinks) {

    /* add class active */
    hreflinks.classList.add('active');

    /* END LOOP: for each found tag link */
  }

  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + author + '"]');
}

authorClickHandler()



function addClickListenersToAuthors() {
  /* find all links to tags */
  const allAuthors = document.querySelectorAll('[href^="#tag-"]');

  /* START LOOP: for each link */
  for (let author of allAuthorss) {

    /* add tagClickHandler as event listener for that link */
    author.addEventListener('click', tagClickHandler);
    console.log('Link was clicked!');

    /* END LOOP: for each link */
  }
}
addClickListenersToAuthors();