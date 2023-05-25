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
import ThemeConfig from './data/theme.json';
import ImageConfig from './data/images.json';
import SizesConfig from './data/sizes.json';

/* Container definition */
const Design = {
    theme:      ThemeConfig,
    sizes:      SizesConfig,
    images:     ImageConfig,
}

Design.theme['typography']['h1']['&::before']['content']='"  "'
Design.theme['typography']['h1']['&::after']['content']='"  "'
Design.theme['typography']['h2']['&::before']['content']='"  "'
Design.theme['typography']['h2']['&::after']['content']='"  "'
Design.theme['typography']['h3']['&::after']['content']='"  "'

/* Container export */
export default Design;
