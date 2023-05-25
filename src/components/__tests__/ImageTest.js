/* ------------------------------------------------------
# THE GREEN BRICK ROAD
# -------------------------------------------------------
# Copyright (c) [2023] The Green Brick Road
# All rights reserved
# -------------------------------------------------------
# Analytics Provider test suite
# -------------------------------------------------------
# Nadège LEMPERIERE, @24 may 2023
# Latest revision: 24 may 2023
# ---------------------------------------------------- */

/* Test includes */
import { render, screen, prettyDOM } from '@testing-library/react'
import { expect, test }              from '@jest/globals';

/* Component under test */
import { Image }                     from '../../components';

/* Mocks includes */
/* eslint-disable jest/no-mocks-import */
import { useDesign as mockUseDesign, DesignProvider as MockDesignProvider } from '../../providers/__mocks__/DesignProvider';
jest.mock('../../providers', () => ({ useDesign: (() => { return mockUseDesign(); }) }));
/* eslint-enable jest/no-mocks-import */


describe("Image component" ,() => {

    test('Should display an image if existing', async () => {

        const images = [
            {
                "name" : "test",
                "raw"  : "test.png",
                "web"  : "test.webp",
            }
        ]

        const sizes = {
            "small-width"          : 200,
            "medium-width"         : 400,
            "large-width"          : 800,
        }

        const view = render(

            <div>
                <MockDesignProvider screen='large' images={images} sizes={sizes}>
                    <Image name='test' style={{ margin:'70px' }}/>
                </MockDesignProvider>
            </div>

        );

        const tree = prettyDOM(view.baseElement, Number.POSITIVE_INFINITY, {filterNode: () => true,highlight: false});
        expect(tree).toMatchSnapshot();

    })

    test('Should not display an image if not existing', async () => {

        const images = [
            {
                "name" : "test",
                "raw"  : "test.png",
                "web"  : "test.webp",
            }
        ]

        const sizes = {
            "small-width"          : 200,
            "medium-width"         : 400,
            "large-width"          : 800,
        }


        render(

            <div>
                <MockDesignProvider screen='large' images={images} sizes={sizes}>
                    <Image name='logo' style={{ margin:'70px' }}/>
                </MockDesignProvider>
            </div>

        );
        expect(screen.queryByTestId('picture-test')).toBeNull();

    })

})
