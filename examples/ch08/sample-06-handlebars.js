
//========================================================
// require
//========================================================
const { title, readonlySample } = require('../diagnostics');

//========================================================
title("handlebars");
//========================================================

readonlySample(() => {
    // -- Pure application -------------------------------------------------
    // blogPage :: Posts -> HTML
    const blogPage = Handlebars.compile(blogTemplate);

    // renderPage :: Posts -> HTML
    const renderPage = compose(blogPage, sortBy(prop('date')));

    // blog :: Params -> Task Error HTML
    const blog = compose(map(renderPage), getJSON('/posts'));


    // -- Impure calling code ----------------------------------------------
    blog({}).fork(
        error => $('#error').html(error.message),
        page => $('#main').html(page),
    );

    $('#spinner').show();
});

