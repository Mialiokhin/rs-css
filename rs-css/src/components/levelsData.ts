import { LevelsData } from '../types';

const LEVELS_DATA: LevelsData[] = [
    {
        level: 1,
        htmlCode: '<div class="carpet">\n' + '<cat />\n' + '<cat />\n' + '</div>',
        htmlCodeGameBoard:
            '<div class="carpet">\n' +
            '<cat class="up-down hide" data-helper="<cat/>"></cat>\n' +
            '<cat class="up-down hide" data-helper="<cat/>"></cat>\n' +
            '</div>',
        cssSelector: ['cat'],
        task: 'Select the cats',
    },
    {
        level: 2,
        htmlCode: '<div class="carpet">\n' + '<cat />\n' + '<dog />\n' + '<cat />\n' + '</div>',
        htmlCodeGameBoard:
            '<div class="carpet">\n' +
            '<cat class="hide" data-helper="<cat/>"></cat>\n' +
            '<dog class="up-down hide" data-helper="<dog/>"></dog>\n' +
            '<cat class="hide" data-helper="<cat/>"></cat>\n' +
            '</div>',
        cssSelector: ['dog'],
        task: 'Select the dog',
    },
    {
        level: 3,
        htmlCode:
            '<div class="carpet">\n' +
            '    <cat />\n' +
            '    <sofa >\n' +
            '        <cat />\n' +
            '    <sofa />\n' +
            '    <cat />\n' +
            '</div>',
        htmlCodeGameBoard:
            '<div class="carpet">\n' +
            '<cat class="hide" data-helper="<cat/>"></cat>\n' +
            '<sofa class="hide" data-helper="<sofa><sofa/>"><cat class="up-down hide" data-helper="<cat/>"></cat></sofa>\n' +
            '<cat class="hide" data-helper="<cat/>"></cat>\n' +
            '</div>',
        cssSelector: ['sofa cat'],
        task: 'Select the cat on the sofa',
    },
    {
        level: 4,
        htmlCode:
            '<div class="carpet">\n' +
            '    <sofa >\n' +
            '        <socks />\n' +
            '    <sofa />\n' +
            '    <sofa >\n' +
            '        <cat />\n' +
            '    <sofa />\n' +
            '    <sofa >\n' +
            '        <socks />\n' +
            '    <sofa />\n' +
            '</div>',
        htmlCodeGameBoard:
            '<div class="carpet">\n' +
            '<sofa class="hide" data-helper="<sofa><sofa/>"><socks class="up-down hide" data-helper="<socks/>"></socks></sofa>\n' +
            '<sofa class="hide" data-helper="<sofa><sofa/>"><cat class="up-down hide" data-helper="<cat/>"></cat></sofa>\n' +
            '<sofa class="hide" data-helper="<sofa><sofa/>"><socks class="up-down hide" data-helper="<socks/>"></socks></sofa>\n' +
            '</div>',
        cssSelector: ['sofa *'],
        task: 'Select everything on a sofa',
    },
    {
        level: 5,
        htmlCode:
            '<div class="carpet">\n' +
            '    <socks />\n' +
            '    <chair >\n' +
            '        <socks />\n' +
            '    <chair />\n' +
            '    <sofa >\n' +
            '        <socks />\n' +
            '    <sofa />\n' +
            '    <socks />\n' +
            '</div>',
        htmlCodeGameBoard:
            '<div class="carpet">\n' +
            '<socks class="hide" data-helper="<socks/>"></socks>\n' +
            '<chair class="hide" data-helper="<chair><chair/>"><socks class="up-down hide" data-helper="<socks/>"></socks></chair>\n' +
            '<sofa class="hide" data-helper="<sofa><sofa/>"><socks class="hide" data-helper="<socks/>"></socks></sofa>\n' +
            '<socks class="hide" data-helper="<socks/>"></socks>\n' +
            '</div>',
        cssSelector: ['chair > socks', 'chair>socks'],
        task: 'Select the socks directly on a chair',
    },
    {
        level: 6,
        htmlCode:
            '<div class="carpet">\n' +
            '    <socks />\n' +
            '    <chair >\n' +
            '        <socks />\n' +
            '    <chair />\n' +
            '    <sofa >\n' +
            '        <socks />\n' +
            '    <sofa />\n' +
            '    <socks />\n' +
            '</div>',
        htmlCodeGameBoard:
            '<div class="carpet">\n' +
            '<socks class="hide" data-helper="<socks/>"></socks>\n' +
            '<chair class="up-down hide" data-helper="<chair><chair/>"><socks class="up-down hide" data-helper="<socks/>"></socks></chair>\n' +
            '<sofa class="up-down hide" data-helper="<sofa><sofa/>"><socks class="hide" data-helper="<socks/>"></socks></sofa>\n' +
            '<socks class="hide" data-helper="<socks/>"></socks>\n' +
            '</div>',
        cssSelector: ['sofa, chair', 'chair, sofa'],
        task: 'Select all the chairs and sofas',
    },
    {
        level: 7,
        htmlCode:
            '<div class="carpet">\n' +
            '    <socks class="black"/>\n' +
            '    <chair >\n' +
            '        <socks />\n' +
            '    <chair />\n' +
            '    <sofa class="black">\n' +
            '        <socks class="black"/>\n' +
            '    <sofa />\n' +
            '    <socks />\n' +
            '</div>',
        htmlCodeGameBoard:
            '<div class="carpet">\n' +
            '<socks class="hide up-down _black-socks" data-helper=\' <socks class = "black" />\'></socks>\n' +
            '<chair class="hide" data-helper="<chair><chair/>"><socks class="hide" data-helper="<socks/>"></socks></chair>\n' +
            '<sofa class="hide _black-sofa" data-helper=\' <sofa class = "black"><sofa/>\'><socks class="hide up-down _black-socks" data-helper=\' <socks class = "black" />\'></socks></sofa>\n' +
            '<socks class="hide" data-helper="<socks/>"></socks>\n' +
            '</div>',
        cssSelector: ['socks.black'],
        task: 'Select the black socks',
    },
    {
        level: 8,
        htmlCode:
            '<div class="carpet">\n' +
            '    <sofa>\n' +
            '        <socks />\n' +
            '    <sofa />\n' +
            '    <sofa id="black">\n' +
            '        <socks />\n' +
            '    <sofa />\n' +
            '    <sofa>\n' +
            '        <socks />\n' +
            '    <sofa />\n' +
            '</div>',
        htmlCodeGameBoard:
            '<div class="carpet">\n' +
            '<sofa class="hide" data-helper=\' <sofa><sofa/>\'><socks class="hide" data-helper=\' <socks/>\'></socks></sofa>\n' +
            '<sofa class="hide _black-sofa" data-helper=\' <sofa id = "black"><sofa/>\'><socks class="hide up-down" data-helper=\' <socks/>\'></socks></sofa>\n' +
            '<sofa class="hide" data-helper=\' <sofa><sofa/>\'><socks class="hide" data-helper=\' <socks/>\'></socks></sofa>\n' +
            '</div>',
        cssSelector: ['#black socks'],
        task: 'Select the socks on the black sofa',
    },
    {
        level: 9,
        htmlCode:
            '<div class="carpet">\n' +
            '    <sofa />\n' +
            '    <sofa>\n' +
            '        <socks />\n' +
            '        <socks />\n' +
            '        <socks />\n' +
            '    <sofa />\n' +
            '    <socks />\n' +
            '</div>',
        htmlCodeGameBoard:
            '<div class="carpet">\n' +
            '<sofa class="hide" data-helper=\' <sofa><sofa/>\'></sofa>\n' +
            '<sofa class="hide" data-helper=\' <sofa><sofa/>\'><socks class="hide up-down" data-helper=\' <socks/>\'></socks><socks class="hide" data-helper=\' <socks/>\'></socks><socks class="hide" data-helper=\' <socks/>\'></socks></sofa>\n' +
            '<socks class="hide" data-helper=\' <socks/>\'></socks>\n' +
            '</div>',
        cssSelector: ['sofa socks:first-child'],
        task: 'Select the first socks on the sofa',
    },
    {
        level: 10,
        htmlCode:
            '<div class="carpet">\n' +
            '        <socks />\n' +
            '        <socks class="black"/>\n' +
            '        <socks />\n' +
            '        <socks />\n' +
            '        <socks />\n' +
            '</div>',
        htmlCodeGameBoard:
            '<div class="carpet">\n' +
            '<socks class="hide" data-helper=\' <socks/>\'></socks>\n' +
            '<socks class="hide _black-socks-center" data-helper=\' <socks class = "black" />\'></socks>' +
            '<socks class="hide" data-helper=\' <socks/>\'></socks>\n' +
            '<socks class="hide up-down" data-helper=\' <socks/>\'></socks>\n' +
            '<socks class="hide" data-helper=\' <socks/>\'></socks>\n' +
            '</div>',
        cssSelector: ['socks:nth-child(4)'],
        task: 'Select the 4th socks',
    },
    {
        level: 11,
        htmlCode:
            '<div class="carpet">\n' +
            '        <socks />\n' +
            '        <socks class="black"/>\n' +
            '        <socks />\n' +
            '        <socks />\n' +
            '        <socks />\n' +
            '</div>',
        htmlCodeGameBoard:
            '<div class="carpet">\n' +
            '<socks class="hide  up-down" data-helper=\' <socks/>\'></socks>\n' +
            '<socks class="hide _black-socks-center" data-helper=\' <socks class = "black" />\'></socks>' +
            '<socks class="hide up-down" data-helper=\' <socks/>\'></socks>\n' +
            '<socks class="hide" data-helper=\' <socks/>\'></socks>\n' +
            '<socks class="hide up-down" data-helper=\' <socks/>\'></socks>\n' +
            '</div>',
        cssSelector: ['socks:nth-of-type(odd)'],
        task: 'Select all odd plates',
    },
    {
        level: 12,
        htmlCode:
            '<div class="carpet">\n' +
            '    <sofa>\n' +
            '        <socks />\n' +
            '    <sofa />\n' +
            '    <sofa />\n' +
            '    <sofa />\n' +
            '</div>',
        htmlCodeGameBoard:
            '<div class="carpet">\n' +
            '<sofa class="hide" data-helper=\' <sofa><sofa/>\'><socks class="hide" data-helper=\' <socks/>\'></socks></sofa>\n' +
            '<sofa class="hide up-down" data-helper=\' <sofa><sofa/>\'></sofa>\n' +
            '<sofa class="hide up-down" data-helper=\' <sofa><sofa/>\'></sofa>\n' +
            '</div>',
        cssSelector: ['sofa:empty'],
        task: 'Select the empty sofas',
    },
];

export default LEVELS_DATA;
