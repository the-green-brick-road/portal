/* ------------------------------------------------------
# THE GREEN BRICK ROAD
# -------------------------------------------------------
# Copyright (c) [2023] The Green Brick Road
# All rights reserved
# -------------------------------------------------------
# Home view component test suite
# -------------------------------------------------------
# Nadège LEMPERIERE, @30 may 2023
# Latest revision: 30 may 2023
# ---------------------------------------------------- */

/* Test includes */
import { render, prettyDOM }       from '@testing-library/react'
import { expect, test}             from '@jest/globals';

/* Component under test */
import { default as Post }         from '../views/post/Post';

/* Mocks includes */
/* eslint-disable jest/no-mocks-import */
import { default as MockImage }    from '../components/__mocks__/Image';
import { useDesign as mockUseDesign, DesignProvider as MockDesignProvider } from '../providers/__mocks__/DesignProvider';
jest.mock("../components", () => ({ Image: (props) => MockImage(props) }));
jest.mock('../providers', () => ({ useDesign: (() => { return mockUseDesign(); }) }));
/* eslint-enable jest/no-mocks-import */


describe("Post view" ,() => {

    test('Should display post page', async () => {

        const sizes = {
            "small-width"          : 200,
            "medium-width"         : 400,
            "large-width"          : 800,
            "menu-height"          : 80,
            "margin"               : 10,
            "hamburger-height"     : 40,
        }


        const view = render(
            <div>
                <MockDesignProvider sizes={sizes}>
                    <Post data={{
                        'code':'<p>Hello</p>',
                        'title':'post',
                        'image':'https://th.bing.com/th/id/R.4aa108082e7d3cbd55add79f84612aaa?rik=I4dbPhSe%2fbHHSg&riu=http%3a%2f%2fpurepng.com%2fpublic%2fuploads%2flarge%2fpurepng.com-google-logo-2015brandlogobrand-logoiconssymbolslogosgoogle-6815229372333mqrr.png&ehk=ewmaCOvP0Ji4QViEJnxSdlrYUrTSTWhi8nZ9XdyCgAI%3d&risl=&pid=ImgRaw&r=0',
                        'date':'13/10/2008',
                        'media':['a','c','b','e','d'],
                    }}/>
                </MockDesignProvider>
            </div>
        );
        const tree = prettyDOM(view.baseElement, Number.POSITIVE_INFINITY, {filterNode: () => true, escapeString: false, highlight: false});
        expect(tree).toMatchSnapshot();

    })

})
