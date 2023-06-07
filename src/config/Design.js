/* ------------------------------------------------------
# THE GREEN BRICK ROAD
# -------------------------------------------------------
# Copyright (c) [2023] The Green Brick Road
# All rights reserved
# -------------------------------------------------------
# Theme configuration parser
# -------------------------------------------------------
# Nadège LEMPERIERE, @12 may 2023
# Latest revision: 12 may 2023
# ---------------------------------------------------- */

/* Local includes */
import LightThemeConfig from './data/theme-light.json';
import DarkThemeConfig from './data/theme-dark.json';
import ImageConfig from './data/images.json';
import SizesConfig from './data/sizes.json';

/* Container definition */
const Design = {
    theme:     {
        light: LightThemeConfig,
        dark:  DarkThemeConfig,
    },
    sizes:      SizesConfig,
    images:     ImageConfig,
}

Design.theme['light']['typography']['h1']['&::before']['content']='"  "'
Design.theme['light']['typography']['h1']['&::after']['content']='"  "'
Design.theme['light']['typography']['h2']['&::before']['content']='"  "'
Design.theme['light']['typography']['h2']['&::after']['content']='"  "'
Design.theme['light']['typography']['h3']['&::after']['content']='"  "'
Design.theme['dark']['typography']['h1']['&::before']['content']='"  "'
Design.theme['dark']['typography']['h1']['&::after']['content']='"  "'
Design.theme['dark']['typography']['h2']['&::before']['content']='"  "'
Design.theme['dark']['typography']['h2']['&::after']['content']='"  "'
Design.theme['dark']['typography']['h3']['&::after']['content']='"  "'

/* Container export */
export default Design;
