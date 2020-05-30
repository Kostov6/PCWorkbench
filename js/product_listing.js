function addClassAll(el, cls) {
    for (var i = 0; i < el.length; ++i) {
        if (!el[i].className.match('(?:^|\\s)' + cls + '(?!\\S)')) { el[i].className += ' ' + cls; }
    }
}
function delClassAll(el, cls) {
    for (var i = 0; i < el.length; ++i) {
        el[i].className = el[i].className.replace(new RegExp('(?:^|\\s)' + cls + '(?!\\S)'), '');
    }
}

function contentFilter(filterID, filterType) {
    var id = filterID;
    document.querySelector(id + ' .filter-categories').onclick = function (evt) {
        if (evt.target.type) {
            evt = evt || window.event;
            var elem = evt.target || evt.srcElement,
                wrap = document.querySelectorAll(id + ' .filter-wrap'),
                items = document.querySelectorAll(id + ' .filter-item'),
                inputs = document.querySelectorAll(id + ' .filter-input'),
                filters = [],
                noitem = document.querySelectorAll(id + ' .filter-no-item'),
                mask = document.querySelectorAll(id + ' .filter-mask'),
                type = filterType;
            addClassAll(mask, 'filter-mask-active');
            setTimeout(function () { delClassAll(mask, 'filter-mask-active'); }, 1000);
            if (elem.className.match('(?:^|\\s)filter-all(?!\\S)')) { // #filter-all
                for (var i = 1; i < inputs.length; ++i) { // loop through inputs but ignore [0] - #filter-all
                    inputs[i].checked = false; // uncheck all other inputs
                }

                setTimeout(function () {
                    delClassAll(items, 'selected');
                    delClassAll(wrap, 'filtered-' + type);
                    delClassAll(noitem, 'filter-no-item-active');
                }, 500);
            } else { // another filter is checked
                inputs[0].checked = false; // uncheck #filter-all
                for (var i = 1; i < inputs.length; ++i) { // loop through inputs but ignore [0] - #filter-all
                    if (inputs[i].checked) { filters.push(inputs[i].id); } // add checked inputs to filters array 
                }

                setTimeout(function () {
                    delClassAll(items, 'selected');
                    addClassAll(wrap, 'filtered-' + type);
                    if (type == 'inclusive') {
                        if (filters.length > 0) {

                            var selectors = [id.concat(' .filter-item')];
                            var defaultFilters = ['ram', 'proc', 'gpu', 'hdd'];
                            for (var i = 0; i < defaultFilters.length; ++i) {

                                var length = selectors.length;
                                for (var k = 0; k < length; ++k) {

                                    var del = false;

                                    for (var j = 0; j < filters.length; ++j) {
                                        if (filters[j].includes(defaultFilters[i])) {
                                            selectors.push(selectors[k].concat('.', filters[j]));
                                            del = true;
                                        }
                                    }

                                    if (del) {
                                        selectors.splice(k, 1);
                                        --k;
                                        --length;
                                    }
                                }
                            }
                            console.log(selectors);

                            for (var i = 0; i < selectors.length; ++i) {
                                addClassAll(document.querySelectorAll(selectors[i]), 'selected');
                            }

                            //addClassAll(document.querySelectorAll(id+' .filter-item.'+filters.join('.')), 'selected');
                        } // build css selector from filters array
                        document.querySelectorAll(id + ' .selected').length == 0 ? addClassAll(noitem, 'filter-no-item-active') : delClassAll(noitem, 'filter-no-item-active');
                    }
                    var checkCount = 0;
                    for (var i = 0; i < inputs.length; ++i) {
                        checkCount += inputs[i].checked ? 1 : 0;
                    }
                    if (checkCount == 0) { inputs[0].checked = true; }
                    if (inputs[0].checked) {
                        delClassAll(wrap, 'filtered-' + type);
                        delClassAll(noitem, 'filter-no-item-active');
                    }
                }, 500);
            }
        }
    }
}

contentFilter('#demo1', 'inclusive');