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
  // console.log('clickedElement:', clickedElement);

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
  // console.log(targetArticle);


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
  optArticleTagsSelector = '.post-tags .list',
  optAuthorsSelector = '.post-author',
  optTagsListSelector = '.tags .list',
  optCloudClassCount = '5',
  optCloudClassPrefix = 'tag-size-',
  optAuthorsListSelector = '.list .authors';

function generateTitleLinks(customSelector = '') {

  /* remove contents of titleList */
  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';
  // console.log(titleList);


  /* for each article */
  const articles = document.querySelectorAll(optArticleSelector + customSelector);
  // console.log(customSelector);
  let html = '';

  for (let article of articles) {
    // document.querySelector(optArticleSelector);


    /* get the article id */
    const articleId = article.getAttribute('id'); /*86*/
    // console.log(articleId);


    /* find the title element */
    // document.querySelectorAll('optTitleListSelector');


    /* get the title from the title element */
    const articleTitle = article.querySelector(optTitleSelector).innerHTML; /*95*/


    /* create HTML of the link */
    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
    // console.log(linkHTML);


    /* insert link into titleList */
    // titleList.insertAdjacentHTML('beforebegin');
    html = html + linkHTML;
  }

  titleList.innerHTML = html;

  const links = document.querySelectorAll('.titles a');
  // console.log(links);

  for (let link of links) {
    link.addEventListener('click', titleClickHandler);
  }
}

generateTitleLinks();


/* *********************************************zadanie 3************************************************************ */

function calculateTagsParams(tags) {

  const params = {max: '0', min: '999999'};

  for (let tag in tags) {
    console.log(tag + ' is used ' + tags[tag] + ' times');

    if (tags[tag] > params.max) {
      params.max = tags[tag];
    }

    if (tags[tag] < params.min) {
      params.min = tags[tag];
    }

  }
  return params;
}


function calculateTagClass(count, params) {

  const normalizedCount = count - params.min;
  const normalizedMax = params.max - params.min;
  const percentage = normalizedCount / normalizedMax;
  const classNumber = Math.floor(percentage * (optCloudClassCount - 1) + 1);

  return optCloudClassPrefix + classNumber;
}


function generateTags() {

  /* [NEW] create a new variable allTags with an empty object */
  let allTags = {};

  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);

  /* START LOOP: for every article: */
  for (let article of articles) {

    /* find tags wrapper */
    const titleList = article.querySelector(optArticleTagsSelector);
    // titleList.innerHTML = '';
    // console.log(titleList);


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
      // console.log(tag);

      /* generate HTML of the link */
      const linkHTML = '<li><a href="#tag-' + tag + '">' + tag + '</a></li>';

      /* add generated code to html variable */
      html = html + linkHTML;

      /* [NEW] check if this link is NOT already in allTags */
      if (!allTags[tag]) {
        /* [NEW] add tag to allTags object */
        allTags[tag] = 1;
      } else {
        allTags[tag]++;
      }

      /* insert HTML of all the links into the tags wrapper*/
      titleList.insertAdjacentHTML('beforeend', linkHTML);
      /* END LOOP: for each tag */
    }

    /* END LOOP: for every article: */
  }

  /* [NEW] find list of tags in right column */
  const tagList = document.querySelector('.tags');

  /* [NEW] add html from allTags to tagList */
  // tagList.innerHTML = allTags.join(' ');
  // console.log(allTags);


  const tagsParams = calculateTagsParams(allTags);
  console.log('tagsParams:', tagsParams);

  /* [NEW] create variable for all links HTML code */
  let allTagsHTML = '';

  /* [NEW] START LOOP: for each tag in allTags: */
  for (let tag in allTags) {
    /* [NEW] generate code of a link and add it to allTagsHTML */
    // allTagsHTML += tag + ' (' + allTags[tag] + ') ';
    // allTagsHTML += '<li><a href="tag + (' + allTags[tag] + ')">' + tag + (allTags[tag]) + '</a></li>';
    const tagLinkHTML = '<li><a class="' + calculateTagClass(allTags[tag], tagsParams) + '" href="#tag-' + tag + '">' + tag + '</a></li>';
    console.log('tagLinkHTML:', tagLinkHTML);
    allTagsHTML += tagLinkHTML;

    /* [NEW] END LOOP: for each tag in allTags: */
  }
  /*[NEW] add HTML from allTagsHTML to tagList */
  tagList.innerHTML = allTagsHTML;


}

generateTags();


function tagClickHandler(event) {
  /* prevent default action for this event */
  event.preventDefault();

  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;

  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');

  /* make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#tag-', '');

  /* find all tag links with class active */
  const tagLinks = document.querySelectorAll('a.active[href^="#tag-"]');

  /* START LOOP: for each active tag link */
  for (let tag of tagLinks) {

    /* remove class active */
    tag.classList.remove('active');

    /* END LOOP: for each active tag link */
  }

  /* find all tag links with "href" attribute equal to the "href" constant */
  const hreflinks = document.querySelectorAll('[href="' + href + '"]');


  /* START LOOP: for each found tag link */
  for (let tag of hreflinks) {

    /* add class active */
    tag.classList.add('active');

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
    // console.log('Link was clicked!');

    /* END LOOP: for each link */
  }
}

addClickListenersToTags();

/* *************************************************zadanie 7.2******************************************************** */

// function calculateAuthorsParams(authors) {
//
//   const params = {max: '0', min: '999999'};
//
//   for (let author in authors) {
//     console.log(author + ' is used ' + authors[author] + ' times');
//
//     if (authors[author] > params.max){
//       params.max = authors[author];
//     }
//
//     if (authors[author] < params.min){
//       params.min = authors[author];
//     }
//
//   }
//   return params;
// }


// function calculateAuthorClass(count, params) {
//
//   const normalizedCount = count - params.min;
//   const normalizedMax = params.max - params.min;
//   const percentage = normalizedCount / normalizedMax;
//   const classNumber = Math.floor( percentage * (optCloudClassCount - 1) + 1 );
//
//   return optCloudClassPrefix + classNumber;
// }


function generateAuthors() {

  // /* [NEW] create a new variable allTags with an empty object */
  let allAuthors = {};

  /* find all articles */
  const authors = document.querySelectorAll(optArticleSelector);

  /* START LOOP: for every article: */
  for (let author of authors) {

    /* find authors wrapper */
    const authorsList = author.querySelector(optAuthorsSelector);
    // console.log(authorsList + 'lista');

    /* make html variable with empty string */
    let html = '';
    // console.log(html + 'html');

    /* get tags from data-author attribute */
    const articleAuthors = author.getAttribute('data-author');
    // console.log(articleAuthors + 'data-author');

    /* generate HTML of the link */
    const linkHTML = '<li><a href="#author-' + articleAuthors + '">' + articleAuthors + '</a></li>';
    // console.log(linkHTML + 'link!');

    /* add generated code to html variable */
    html = html + linkHTML;


    // /* [NEW] check if this link is NOT already in allTags */
    if (!allAuthors[articleAuthors]) {
      //   /* [NEW] add tag to allTags object */
      allAuthors[articleAuthors] = 1;
    } else {
      allAuthors[articleAuthors]++;
    }

    /* insert HTML of all the links into the tags wrapper*/
    authorsList.insertAdjacentHTML('beforeend', linkHTML);

    /* END LOOP: for every article: */
  }

// /* [NEW] find list of tags in right column */
  const authorList = document.querySelector('.authors');

  // const authorsParams = calculateAuthorsParams(allAuthors);
  // console.log('authorsParams:', authorsParams);
//
// /* [NEW] create variable for all links HTML code */
  let allAuthorsHTML = '';
//
// /* [NEW] START LOOP: for each tag in allTags: */
  for (let author in allAuthors) {
//   /* [NEW] generate code of a link and add it to allTagsHTML */
    const authorLinkHTML = '<li><a href="#author-' + author + '">' + author + (allAuthors[author]) + '</a></li>';
    console.log('authorLinkHTML:', authorLinkHTML);
    allAuthorsHTML += authorLinkHTML;

//   /* [NEW] END LOOP: for each tag in allTags: */
  }
// /*[NEW] add HTML from allTagsHTML to tagList */
  authorList.innerHTML = allAuthorsHTML;
}

generateAuthors();


function authorClickHandler(event) {
  /* prevent default action for this event */
  event.preventDefault();

  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;

  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');


  // /* make a new constant "tag" and extract tag from the "href" constant */
  const author = href.replace('#author-', '');


  /* find all tag links with class active */
  const authorsLinks = document.querySelectorAll('a.active[href^="#author-"]');
  // console.log(authorsLinks);

  /* START LOOP: for each active tag link */
  for (let author of authorsLinks) {

    /* remove class active */
    author.classList.remove('active');

    /* END LOOP: for each active tag link */
  }

  /* find all tag links with "href" attribute equal to the "href" constant */
  const hreflinks = document.querySelectorAll('[href="' + href + '"]');


  /* START LOOP: for each found tag link */
  for (let author of hreflinks) {

    /* add class active */
    author.classList.add('active');

    /* END LOOP: for each found tag link */
  }

  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-author="' + author + '"]');
  console.log(generateTitleLinks);

}


function addClickListenersToAuthors() {
  /* find all links to tags */
  const allLinks = document.querySelectorAll('[href^="#author-"]');


  /* START LOOP: for each link */
  for (let link of allLinks) {

    /* add tagClickHandler as event listener for that link */
    link.addEventListener('click', authorClickHandler);
    // console.log('Link was clicked!');

    /* END LOOP: for each link */
  }
}

addClickListenersToAuthors();

/* *****************************************zadanie 7.3************************************************************** */



























