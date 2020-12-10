const express = require('express');
const session = require('express-session');
const publicDir = `${__dirname}/..`;
const path = require('path')

const app = express();
const port = 3000;

const moduleVic = require("./moduleVic")
const moduleSasho = require("./moduleSasho")
const moduleSefko = require("./moduleSefko");

const modules = [moduleVic, moduleSasho, moduleSefko];

app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

const routeMap = {
    GET: {
        '/': getPage('index.html'),
        '/component': getPage('component_page.html'),
        '/build-PC': getPage('build-PC.html'),
        '/cart': getPage('cart.html'),
        '/checkout': getPage('checkout.html'),
        '/components': getPage('components.html'),
        '/login': getPage('login.html'),
        '/pre-built': getPage('pre-built.html'),
        '/products': getPage('product-listing.html'),
        '/computer': getPage('product_page.html'),
        '/profile': getPage('profile.html'),
        '/register': getPage('register.html'),
        '/not-found': getPage('not-found.html')
    }
}

function getPage(pageName) {
    return path.resolve(publicDir + "/" + pageName);
}

app.use('/css', express.static(path.resolve(publicDir + '/css')));
app.use('/images', express.static(path.resolve(publicDir + '/images')));
app.use('/client', express.static(path.resolve(publicDir + '/client')));
app.use('/fontawesome-free-5.13.0-web', express.static(path.resolve(publicDir + '/fontawesome-free-5.13.0-web')));

for (module of modules) {
    module.forEach(element => {
        if (element.method == "GET")
            app.get(element.path, element.endpointFunction);
        if (element.method == "POST")
            app.post(element.path, element.endpointFunction);
    });
}

app.get('*', (req, res) => {
    let page = req.url.split('?')[0];
    if (Object.keys(routeMap.GET).includes(page)) {
        res.sendFile(routeMap.GET[page]);
    } else {
        res.sendFile(routeMap.GET['/not-found']);
    }
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});