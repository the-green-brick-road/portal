/* ------------------------------------------------------
# THE GREEN BRICK ROAD
# -------------------------------------------------------
# Copyright (c) [2023] The Green Brick Road
# All rights reserved
# -------------------------------------------------------
# Navigation Bar component
# -------------------------------------------------------
# Nadège LEMPERIERE, @18 may 2023
# Latest revision: 23 may 2023
# ---------------------------------------------------- */

/* React includes */
import { useRef, Profiler }                       from 'react';

/* Material UI includes */
import { ButtonGroup, MenuList, MenuItem, Link }  from '@mui/material';

/* Portal includes */
import { useLogging, useMenu }                    from '../../providers';
//import { Login }                                  from '../../components';

/* Local includes */
import NavigationButton                           from './NavigationButton';
import NavigationLogo                             from './NavigationLogo';
import NavigationStack                            from './NavigationStack';

function NavigationBar(props) {

    /* --------- Gather inputs --------- */
    const { height = '20px', isNegative = false, isDark = false, theme={} } = props
    const { logText, onRender }                                             = useLogging();
    const { selectEntry, isItemSelected, entries}                           = useMenu();
    const allRef        = useRef({});
    const componentName = 'NavigationBar';

    /* -------- Defining theme --------- */
    let stackcolor = theme.palette.primary.main;
    if (isNegative && !isDark) { stackcolor = theme.palette.common.white; }
    if (isNegative && isDark) { stackcolor = theme.palette.common.black; }

    let menucolor = theme.palette.common.white;
    if (isDark) { menucolor = theme.palette.common.black; }
    if (isNegative) { menucolor = theme.palette.primary.main; }

    let style = 'solid';
    if (isNegative) { style = 'none'; }

    /* ------ Manage button click ------ */
    const handleButtonClick = (event) => {

        logText(componentName, 'debug', 'workflow', ' handleButtonClick');
        selectEntry(event.target.name, !(isItemSelected[event.target.name]) );

    };

    /* ----- Manage menu selection ----- */
    const handleClose = (event) => {

        logText(componentName, 'debug', 'workflow', ' handleClose');
        selectEntry(event.target.name, false);

    };

    /* ----------- Define HTML --------- */
    return (


        <Profiler id={componentName} onRender={onRender}>
            <NavigationStack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                color={stackcolor}
                padding="10px"
                height={height}
            >
                <NavigationStack
                    direction="row"
                    justifyContent="flex-start"
                    alignItems="center"
                    color="rgba(255,255,255,0)"
                    spacing={1}
                    padding="0px"
                    height={height}
                >
                    <NavigationLogo
                        name='logo'
                        padding='10px'
                    />
                    <ButtonGroup
                        disableElevation={true}
                        disableFocusRipple={true}
                        fullWidth={true}
                        disableRipple={true}
                        style={{ marginLeft: '0px', marginRight: '0px', width: '100%', left: 0 }}
                    >
                        { entries.map((item, index) => { /* Loop on all menu content to create button */

                            const IconName = item.icon;
                            const visibility = (isItemSelected[item.id] ? 'visible' : 'hidden')
                            return (
                                <div key={item.id} aria-label={item.id}>
                                    <NavigationButton
                                        id={item.id}
                                        theme={theme}
                                        name={item.id}
                                        className={isItemSelected[item.id] ? 'selected' : 'nonselected'}
                                        ref = {ref => allRef.current[index] = ref}
                                        col={stackcolor}
                                        variant="text"
                                        href={ 'subitems' in item ? null : item.path }
                                        target={ 'subitems' in item ? null : item.target }
                                        alt={item.id}
                                        startIcon={<IconName style={{height:theme.typography.button.fontSize}}/>}
                                        onClick={'subitems' in item ? handleButtonClick : handleClose}
                                    >
                                        {item.id}
                                    </NavigationButton>
                                    {('subitems' in item) && (
                                        <MenuList
                                            open={isItemSelected[item.id]}
                                            style={{padding:0, borderRadius:0, visibility:visibility, position:'absolute', top:height, borderWidth:'1px', borderStyle:style, borderColor:theme.palette.primary.main}}
                                        >
                                            {item.subitems.map((subitem) => {

                                                return (
                                                    <MenuItem onClick={handleClose} key={subitem.id} style={{backgroundColor:menucolor, color:stackcolor, borderRadius:0}}>
                                                        <Link aria-label={subitem.id} href={subitem.path} target={subitem.target} style={{ textDecoration: 'none', color:stackcolor, fontSize:'15px' }}>
                                                            {subitem.id}
                                                        </Link>
                                                    </MenuItem>
                                                );

                                            })}
                                        </MenuList>
                                    )}
                                </div>
                            );

                        })}
                    </ButtonGroup>
                </NavigationStack>
            </NavigationStack>
        </Profiler>
    );

}

export default NavigationBar;
