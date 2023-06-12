/* ------------------------------------------------------
# THE GREEN BRICK ROAD
# -------------------------------------------------------
# Copyright (c) [2023] The Green Brick Road
# All rights reserved
# -------------------------------------------------------
# Menu configuration parser
# -------------------------------------------------------
# Nadège LEMPERIERE, @23 may 2023
# Latest revision: 23 may 2023
# ---------------------------------------------------- */

/* Material UI includes */
import { default as Home }          from '@mui/icons-material/Home';
import { default as EmojiEvents }   from '@mui/icons-material/EmojiEvents';
import { default as SmartToy }      from '@mui/icons-material/SmartToy';
import { default as Newspaper }     from '@mui/icons-material/Newspaper';
import { default as Stadium }       from '@mui/icons-material/Stadium';

/* Local includes */
import MenuConfig                   from './data/menu.json';

/* Container definition */
const Menu = { entries: MenuConfig }

for (let i_entry = 0; i_entry < Menu.entries.length; i_entry += 1) {

    if(Menu.entries[i_entry].icon === 'Home')               { Menu.entries[i_entry].icon = Home }
    else if(Menu.entries[i_entry].icon === 'EmojiEvents')   { Menu.entries[i_entry].icon = EmojiEvents }
    else if(Menu.entries[i_entry].icon === 'SmartToy')      { Menu.entries[i_entry].icon = SmartToy }
    else if(Menu.entries[i_entry].icon === 'Newspaper')     { Menu.entries[i_entry].icon = Newspaper }
    else if(Menu.entries[i_entry].icon === 'Stadium')       { Menu.entries[i_entry].icon = Stadium }

}

/* Container export */
export default Menu;
