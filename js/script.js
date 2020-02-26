const templates = {
  articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
  tagLink: Handlebars.compile(document.querySelector('#template-tag-link').innerHTML),
  authorLink: Handlebars.compile(document.querySelector('#template-author-link').innerHTML),
  tagCloudLink: Handlebars.compile(document.querySelector('#template-tag-cloud-link').innerHTML),
  authorRightList: Handlebars.compile(document.querySelector('#template-author-right-list').innerHTML),
};

'use strict';
/*document.getElementById('test-button').addEventListener('click', function(){
  const links = document.querySelectorAll('.titles a');
  console.log('links:', links);
});
*/
{

  const titleClickHandler = function(event){
    event.preventDefault();
    const clickedElement = this;
    console.log('Link was clicked!');


    /*[DONE] remove class 'active' from all article links  */
    const activeLinks = document.querySelectorAll('.titles a.active');

    /*Pętla sprawdzająca czy dany link jest aktywny*/
    for(let activeLink of activeLinks){
      activeLink.classList.remove('active');
    }

    /* [DONE] add class 'active' to the clicked link */
    clickedElement.classList.add('active');
    console.log('clickedElement:', clickedElement);

    /* [DONE] remove class 'active' from all articles */
    const activeArticles = document.querySelectorAll('.posts article.active');

    /*Pętla sprawdza, który artykuł jest active, a jesli jest - usuwa Active class*/
    for(let activeArticle of activeArticles){
      activeArticle.classList.remove('active');
    }

    /* [DONE] get 'href' attribute from the clicked link */
    const articleSelector = clickedElement.getAttribute('href');
    console.log(articleSelector);

    /* [DONE] find the correct article using the selector (value of 'href' attribute) */
    const targetArticle = document.querySelector(articleSelector);
    console.log(targetArticle);

    /* [DONE] add class 'active' to the correct article */
    targetArticle.classList.add('active');
  };


  const optArticleSelector = '.post',
    optTitleSelector = '.post-title',
    optTitleListSelector = '.titles',
    optArticleTagsSelector = '.post-tags .list',
    optTagsListSelector = '.list .tags',
    optArticleAuthorSelector = '.post-author',
    optAuthorsListSelector = '.authors';



  function generateTitleLinks(customSelector = '') {

    /* remove contents of titleList */
    const titleList = document.querySelector(optTitleListSelector);
    titleList.innerHTML = '';
    let html = '';

    /* for each article */
    const articles = document.querySelectorAll(optArticleSelector + customSelector);

    for(let article of articles){
    /* get the article id */
      const articleId = article.getAttribute('id');
      /* find the title element */
      const articleTitle = article.querySelector(optTitleSelector).innerHTML;
      /* get the title from the title element */

      /* create HTML of the link */
      const linkHTMLData = {id: articleId, title: articleTitle};
      const linkHTML = templates.articleLink(linkHTMLData);
      //const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
      //element.insertAdjacentHTML(position, text);
      titleList.insertAdjacentHTML('beforeend', linkHTML);
      /* insert link into html variable */
      html = html + linkHTML;
    }
    /* insert link into titleList */
    titleList.innerHTML = html;

    const links = document.querySelectorAll('.titles a');
    for(let link of links){
      link.addEventListener('click', titleClickHandler);
    }
  }
  generateTitleLinks();

  function generateTags() {
    /* [NEW] create a new variable allTags with an empty array */
    let allTags = {};
    /* find all articles */
    const articles = document.querySelectorAll(optArticleSelector);
    /* START LOOP: for every article: */
    for (let article of articles) {
      /* find tags wrapper */
      const titleList = article.querySelector(optArticleTagsSelector);
      titleList.innerHTML='';
      /* make html variable with empty string */
      let html = '';

      /* get tags from data-tags attribute */
      const articleTags = article.getAttribute('data-tags');
      console.log(articleTags);

      /* split tags into array */
      const articleTagsArray = articleTags.split(' ');

      /* START LOOP: for each tag */
      for (let tag of articleTagsArray){
        if(allTags[tag]) {
          allTags[tag]++;
        } else {
          allTags[tag] = 1;
        }

        /* generate HTML of the link */
        const linkHTMLData = {id: tag, title: tag};
        const linkHTML = templates.tagLink(linkHTMLData);
        //const linkHTML = `<li><a href="#tag-${tag}"><span>${tag}</span></a></li>`;

        /* add generated code to html variable */
        html = html + linkHTML;

      /* END LOOP: for each tag */
      }
      /* insert HTML of all the links into the tags wrapper */
      titleList.innerHTML = html;

      /* END LOOP: for every article: */
    }
      /* [NEW] find list of tags in right column */
      const tagList = document.querySelector('.tags');

      /* [NEW] create variable for all links HTML code */
      const allTagsData = {tags: []};

      /* [NEW] START LOOP: for each tag in allTags: */
      let html= '';
      for(let tag in allTags) {

        let className = '';
        if(allTags[tag] < 4) className = 'tag-size-small';
        else if(allTags[tag] < 8) className = 'tag-size-medium';
        else className = 'tag-size-big';

        console.log(className);

        html += `<li class="${className}"><a href="#tag-${tag}"><span>${tag} (${allTags[tag]})</span></a></li>`;
      }
      tagList.innerHTML = html;

    /*Handlebars - ZAMIEN NA:

    const tagList = document.querySelector('.tags');
    const allTagsData = {tags: []};

      for(let tag in allTags) {
        allTagsData.tags.push({

          tag: tag,
          count: allTags[tag],
          className: .....?
      });

      tagList.innerHTML = templates.tagCloudLink(allTagsData);
*/
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
    const tagLinks = document.querySelectorAll('a.active[href^="#tag-"]');

      /* START LOOP: for each active tag link */
      for(let tagLink of tagLinks) {
    /* remove class active */
      tagLink.classList.remove('active');
    /* END LOOP: for each active tag link */
    }
    /* find all tag links with "href" attribute equal to the "href" constant */
    const hTags = document.querySelectorAll('a[href="'+ href + '"]');

    /* START LOOP: for each found tag link */
    for(let hTag of hTags){
    /* add class active */
      hTag.classList.add('active');
    /* END LOOP: for each found tag link */
    }
    /* execute function "generateTitleLinks" with article selector as argument */
    generateTitleLinks('[data-tags~="' + tag + '"]');
  }

  function addClickListenersToTags(){
  /* find all links to tags */
    const tagLinks = document.querySelectorAll('a[href^="#tag-"]');

    /* START LOOP: for each link */
    for(let tagLink of tagLinks){
    /* add tagClickHandler as event listener for that link */
      tagLink.addEventListener('click', tagClickHandler);
    /* END LOOP: for each link */
    }
  }

  addClickListenersToTags();


  function generateAuthors() {
    /*generate a new variable allAuthors with an empty object*/
    let allAuthors = {};
    /* find all articles */
    const articles = document.querySelectorAll(optArticleSelector);
    /* START LOOP: for every article: */
    for (let article of articles) {
      /* find wrapper */
      const authorWrapper = article.querySelector(optArticleAuthorSelector);
      authorWrapper.innerHTML = '';
      /* make html variable with empty string */
      let html = '';
      /* get authors from data-authors attribute */
      const articleAuthor = article.getAttribute('data-author');
      /* generate HTML of the link */
      const linkHTMLData = {id: articleAuthor, title: articleAuthor};
      const linkHTML = templates.authorLink(linkHTMLData);
      //const linkHTML = `by <a href="#author-${articleAuthor}"><span>${articleAuthor}</span></a>`;
      /* add generated code to html variable */
      html = html + linkHTML;
      /* insert HTML of all the links into the author wrapper */
      authorWrapper.innerHTML = html;

      /* count articles for each author*/
      if (allAuthors[articleAuthor]) {
        allAuthors[articleAuthor]++;
      } else {
        allAuthors[articleAuthor] = 1;
      }
      console.log(allAuthors);
    }

    /* find list of authors in right column*/
    const authorList = document.querySelector(optAuthorsListSelector);
    console.log(authorList);

    /*create variable for all links HTML code*/
    let allAuthorsData = {authors: []};

    /*generate code of a link and add it to allAuthorsHTML*/
    for (let author in allAuthors) {
      allAuthorsData.authors.push ({
        author: author,
        count: allAuthors[author]
      });
    //  allAuthorsHTML += author + ' (' + allAuthors[author] + ') ';
   }
    /*add html from allAuthorsHTML to authorList*/
     authorList.innerHTML = templates.authorRightList(allAuthorsData);
  }
  generateAuthors();


  function authorClickHandler(event) {
    /* prevent default action for this event */
    event.preventDefault();
    /* make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement = this;
    /* make a new constant "href" and read the attribute "href" of the clicked element */
    const href = clickedElement.getAttribute('href');
    /* make a new constant "author" and extract author from the "href" constant */
    const author = href.replace('#author-', '');
    /* find all author links with class active */
    const authorLinks = document.querySelectorAll('a.active[href^="#author-"]');
    /* Start LOOP for each active author link */
    for(let authorLink of authorLinks){
      /* remove class active */
      authorLink.classList.remove('active');
      /* END LOOP: for each active tag link */
    }
    /* find all author links with "href" attribute equal to the "href" constant */
    const hAuthors = document.querySelectorAll('a[href="' + href + '"]');
    /* Start LOOP for each found author Link */
    for(let hAuthor of hAuthors){
      /* Add class active */
      hAuthor.classList.add('active');
    }
    /* execute function "generateTitleLinks" with article selector as argument */
    generateTitleLinks('[data-author="' + author + '"]');

  }

  function addClickListenersToAuthors(){
    /* find all links to author */
    const authorLinks = document.querySelectorAll('a[href^="#author-"]');
    /*start LOOP for each link*/
    for(let authorLink of authorLinks){
      /* add authorClickHandler as eventListener for that link */
      authorLink.addEventListener('click', authorClickHandler);
      /* END LOOP: for each link */
    }
  }
  addClickListenersToAuthors();

}
