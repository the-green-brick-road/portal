/* ------------------------------------------------------
# THE GREEN BRICK ROAD
# -------------------------------------------------------
# Copyright (c) [2023] The Green Brick Road
# All rights reserved
# -------------------------------------------------------
# Hamburger Menu component
# -------------------------------------------------------
# Nadège LEMPERIERE, @24 may 2023
# Latest revision: 24 may 2023
# ---------------------------------------------------- */

/* Material UI includes */
import { MenuList, MenuItem, ListItemText, ListItemIcon, Link, Divider, Container } from '@mui/material';
import { styled }                                                                   from '@mui/system';

/* Portal includes */
import { useMenu, useLogging }                                                      from '../../providers';

const HamburgerMenuFrame = styled(Container)(({ width, left, top, color }) => ({
    width,
    textAlign: 'right',
    top,
    left,
    padding:0,
    backgroundColor: color,
    zIndex: 1000,
    fontSize: '10px',
    position: 'absolute',
}));

const HamburgerMenuItem = styled(MenuItem)(({ padding, height, color }) => ({
    height,
    paddingBottom: padding,
    paddingTop: padding,
    paddingLeft: '10px',
    paddingRight: '10px',
    minHeight: '30px',
    fontSize: '14px',
    textDecoration: 'none',
    textDecorationColor: 'black',
    a: { textDecoration: 'none' },
    '&:hover': {
        borderTopStyle: 'none',
        borderLeftStyle: 'solid',
        borderBottomStyle: 'none',
        borderRightStyle: 'none',
        borderWidth: '3px',
        borderColor: color,
        transition: 'border-bottom-style 2s',
    },
}));

const HamburgerMenuSubItem = styled(MenuItem)(({ padding, height, color }) => ({
    height,
    paddingBottom: padding,
    paddingTop: padding,
    paddingLeft: '10px',
    paddingRight: '10px',
    minHeight: '0px',
    fontSize: '14px',
    textDecoration: 'none',
    textDecorationColor: 'black',
    a: { textDecoration: 'none' },
    '&:hover': {
        borderTopStyle: 'none',
        borderLeftStyle: 'solid',
        borderBottomStyle: 'none',
        borderRightStyle: 'none',
        borderWidth: '3px',
        borderColor: color,
        transition: 'border-bottom-style 2s',
    },
}));

const HamburgerMenuList = styled(MenuList)(({ padding }) => ({
    paddingTop: padding,
    paddingBottom: padding,
}));

const HamburgerListItemText = styled(ListItemText)(({ color }) => ({
    textDecoration: 'none',
    textTransform: 'uppercase',
    color,
    textDecorationColor: 'black',
    span: {
        color,
        fontSize: '12px',
        fontWeight: 'bold',
        textDecoration: 'none',
        textDecorationColor: 'black',
    },
}));

const HamburgerListSubItemText = styled(ListItemText)(({ color }) => ({
    textDecoration: 'none',
    textTransform: 'uppercase',
    color,
    paddingLeft: '30px',
    textDecorationColor: 'black',
    span: {
        color,
        fontSize: '12px',
        paddingLeft: '30px',
        fontWeight: 'bold',
        textDecoration: 'none',
        textDecorationColor: 'black',
    },
}));

const HamburgerListItemIcon = styled(ListItemIcon)(({ color }) => ({ color }));

function HamburgerMenu(props) {

    /* --------- Gather inputs --------- */
    const { top = '95px', margin='20px', itemHeight='20px', isNegative = false, theme={palette:{common:{white:'#ffffff'},primary:{main:'#000000'},secondary:{main:'#ffffff'}}} } = props;
    const { selectEntry, entries, isItemSelected, setMenuState }                           = useMenu();
    const { logText }                                                                      = useLogging();
    const componentName    = 'HamburgerMenu';

    /* --------- Derive sizes ---------- */
    const menuWidthString = `calc( 100vw - 2 * ${margin})`;

    /* ------ Manage button click ------ */
    const handleClick = (event) => {

        logText(componentName, 'debug', 'workflow', ' handleClick');
        selectEntry(event.target.parentNode.parentNode.getAttribute("name"), true);

    };

    /* ----- Manage menu selection ----- */
    const handleClose = (event) => {

        logText(componentName, 'debug', 'workflow', ' handleClose');
        selectEntry(event.target.parentNode.parentNode.getAttribute("name"), false);
        setMenuState(false);

    };

    /* -------- Defining theme --------- */
    let txtcolor = theme.palette.primary.main;
    if (isNegative) { txtcolor = theme.palette.common.white; }

    let menucolor = theme.palette.common.white;
    if (isNegative) { menucolor = theme.palette.primary.main; }

    /* ----------- Define HTML --------- */
    return (
        <HamburgerMenuFrame top={top} left={0} width={menuWidthString} color={menucolor}>
            <HamburgerMenuList padding="0px">
                {entries.map((item) => {

                    const IconName = item.icon;
                    return (
                        <div key={item.id}>
                            {('subitems' in item) && (
                                <HamburgerMenuItem name={item.id} divider={false} padding="0px" height={itemHeight} color={txtcolor} onClick={handleClick} >
                                    <HamburgerListItemIcon color={txtcolor}>
                                        <IconName />
                                    </HamburgerListItemIcon>
                                    <HamburgerListItemText color={txtcolor}>
                                        {item.id}
                                    </HamburgerListItemText>
                                </HamburgerMenuItem>
                            )}
                            {('subitems' in item) && item.subitems.map((subitem) => {

                                return (
                                    <Link key={subitem.id} underline="none" href={subitem.path} target={subitem.target} name={subitem.id}>
                                        <HamburgerMenuSubItem name={item.id} onClick={handleClose} divider={false} padding="0px" height={itemHeight} color={txtcolor}>
                                            <HamburgerListSubItemText color={txtcolor}>
                                                {subitem.id}
                                            </HamburgerListSubItemText>
                                        </HamburgerMenuSubItem>
                                    </Link>
                                )

                            })}
                            {('subitems' in item) && <Divider light />}
                            {!('subitems' in item) && (
                                <Link key={item.id} underline="none" href={item.path} target={item.target} name={item.id}>
                                    <HamburgerMenuItem name={item.id} onClick={handleClose} divider={true} key={item.id} padding="0px" height={itemHeight} color={txtcolor}>
                                        <HamburgerListItemIcon color={txtcolor}>
                                            <IconName />
                                        </HamburgerListItemIcon>
                                        <HamburgerListItemText color={txtcolor}>
                                            {item.id}
                                        </HamburgerListItemText>
                                    </HamburgerMenuItem>
                                </Link>
                            )}
                        </div>
                    );

                })}
            </HamburgerMenuList>
        </HamburgerMenuFrame>
    );

}

export default HamburgerMenu;
