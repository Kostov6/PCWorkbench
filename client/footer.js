window.addEventListener('load', (event) => {
    const html = `<footer class="page-footer font-small bg-dark text-white-50 pt-1">
    <div class="container text-center">
        <div class="row">
            <div class="col-8 mt-3">
                <h5 class="text-uppercase mb-3">PC Workbench</h5>
                <p>Our aim is to help computer enthusiasts build their dream computer. We achieve our goal by
                    presenting a wide variaty of components for the customer to choose from.</p>
                <p>This site also allows our users to buy completed builts and separate components.</p>
            </div>

            <div class="col-4 mt-3">
                <h5 class="text-uppercase">Customer support</h5>
                <ul class="list-unstyled">
                    <li class="text-break">
                        E-mail: suppport@PCWorkBench.com
                    </li>
                    <li>
                        Live line: 088888888
                    </li>
                    <li>
                        Live chat: link
                    </li>
                    <li>
                        Address: adress
                    </li>
                </ul>
            </div>
        </div>
    </div>`
    const footer = document.createElement("footer");
    footer.setAttribute("class", "page-footer font-small bg-dark text-white-50 pt-1");
    footer.innerHTML = html;
    document.body.append(footer);
})
