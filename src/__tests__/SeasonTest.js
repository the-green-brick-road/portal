/* ------------------------------------------------------
# THE GREEN BRICK ROAD
# -------------------------------------------------------
# Copyright (c) [2023] The Green Brick Road
# All rights reserved
# -------------------------------------------------------
# Season view component test suite
# -------------------------------------------------------
# Nadège LEMPERIERE, @30 may 2023
# Latest revision: 30 may 2023
# ---------------------------------------------------- */

/* Test includes */
import { render, prettyDOM }       from '@testing-library/react'
import { expect, test}             from '@jest/globals';

/* Component under test */
import { default as Season }       from '../views/season/Season';

/* Mocks includes */
/* eslint-disable jest/no-mocks-import */
import { default as MockImage }    from '../components/__mocks__/Image';
import { useDesign as mockUseDesign, DesignProvider as MockDesignProvider } from '../providers/__mocks__/DesignProvider';
import { useLogging as mockUseLogging, LoggingProvider as MockLoggingProvider } from '../providers/__mocks__/LoggingProvider';
jest.mock("../components", () => ({ Image: (props) => MockImage(props) }));
jest.mock('../providers', () => ({
    useDesign: (() => { return mockUseDesign(); }),
    useLogging: (() => { return mockUseLogging(); }),
}));
/* eslint-enable jest/no-mocks-import */

describe("Season view" ,() => {

    const sizes = {
        "small-width"          : 200,
        "medium-width"         : 400,
        "large-width"          : 800,
        "menu-height"          : 80,
        "margin"               : 10,
        "hamburger-height"     : 40,
    }

    test('Should display season page for desktop', async () => {

        const view = render(
            <div>
                <MockLoggingProvider>
                    <MockDesignProvider screen="large" sizes={sizes}>
                        <Season data={{
                            'name':'season',
                            'image':'https://th.bing.com/th/id/R.4aa108082e7d3cbd55add79f84612aaa?rik=I4dbPhSe%2fbHHSg&riu=http%3a%2f%2fpurepng.com%2fpublic%2fuploads%2flarge%2fpurepng.com-google-logo-2015brandlogobrand-logoiconssymbolslogosgoogle-6815229372333mqrr.png&ehk=ewmaCOvP0Ji4QViEJnxSdlrYUrTSTWhi8nZ9XdyCgAI%3d&risl=&pid=ImgRaw&r=0',
                            'reveal':'JBSUgDxICg8',
                            'robot-game':'T2sv8jXoP4s',
                            'robot-game-gbr':'T2sv8jXoP4s',
                            'judging-session-gbr':'temp.pdf',
                            'resources':[{'name':'google','url':'www.google.com'}],
                            'competitions' : [
                                {'name':'compet1', 'level':'regional','rank':'Champion','award':'best','date':{seconds:40000000}},
                                {'name':'compet2', 'level':'regional','rank':'Champion','award':'best','date':{seconds:60000000}},
                                {'name':'compet3', 'level':'international','rank':'Champion','award':'best','date':{seconds:50000000}},
                                {'name':'compet4', 'level':'international','rank':'Champion','award':'best','date':{seconds:45000000}}
                            ],
                        }}/>
                    </MockDesignProvider>
                </MockLoggingProvider>
            </div>
        );
        const tree = prettyDOM(view.baseElement, Number.POSITIVE_INFINITY, {filterNode: () => true, escapeString: false, highlight: false});
        expect(tree).toMatchSnapshot();

    })

    test('Should display season page for mobile', async () => {

        const view = render(
            <div>
                <MockLoggingProvider>
                    <MockDesignProvider screen="small" sizes={sizes}>
                        <Season data={{
                            'name':'season',
                            'image':'https://th.bing.com/th/id/R.4aa108082e7d3cbd55add79f84612aaa?rik=I4dbPhSe%2fbHHSg&riu=http%3a%2f%2fpurepng.com%2fpublic%2fuploads%2flarge%2fpurepng.com-google-logo-2015brandlogobrand-logoiconssymbolslogosgoogle-6815229372333mqrr.png&ehk=ewmaCOvP0Ji4QViEJnxSdlrYUrTSTWhi8nZ9XdyCgAI%3d&risl=&pid=ImgRaw&r=0',
                            'reveal':'JBSUgDxICg8',
                            'robot-game':'T2sv8jXoP4s',
                            'robot-game-gbr':'T2sv8jXoP4s',
                            'judging-session-gbr':'temp.pdf',
                            'resources':[{'name':'google','url':'www.google.com'}],
                            'competitions' : [
                                {'name':'compet1', 'level':'regional','rank':'Champion','award':'best','date':{seconds:40000000}},
                                {'name':'compet2', 'level':'regional','rank':'Champion','award':'best','date':{seconds:60000000}},
                                {'name':'compet3', 'level':'international','rank':'Champion','award':'best','date':{seconds:50000000}},
                                {'name':'compet4', 'level':'international','rank':'Champion','award':'best','date':{seconds:45000000}}
                            ],
                        }}/>
                    </MockDesignProvider>
                </MockLoggingProvider>
            </div>
        );
        const tree = prettyDOM(view.baseElement, Number.POSITIVE_INFINITY, {filterNode: () => true, escapeString: false, highlight: false});
        expect(tree).toMatchSnapshot();

    })

})
