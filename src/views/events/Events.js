/* ------------------------------------------------------
# THE GREEN BRICK ROAD
# -------------------------------------------------------
# Copyright (c) [2023] The Green Brick Road
# All rights reserved
# -------------------------------------------------------
# Events view component
# -------------------------------------------------------
# Nadège LEMPERIERE, @11 june 2023
# Latest revision: 12 june 2023
# ---------------------------------------------------- */

/* React includes */
import { Fragment, useState, useEffect }             from 'react';

/* Material UI includes */
import { Typography, Container, Table, TableBody }   from '@mui/material';
import { TableRow, TableCell, Chip, Stack }          from '@mui/material';
import { default as LocationOn }                     from '@mui/icons-material/LocationOn';
import { useTheme }                                  from '@mui/material/styles';

/* Portal includes */
import { useData }                                   from '../../providers';
import { Image }                                     from '../../components';

/* Local includes */
import { default as EventsDivider }                  from './EventsDivider';

function Competitions() {

    /* --------- Gather inputs --------- */
    const theme                           = useTheme();
    const { calendars }                   = useData();
    const [ localEvents, setLocalEvents ] = useState([])
    const months   = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    const days   = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

    /* ------- Preprocess competitions ------- */
    useEffect(() => {

        const now = new Date()
        const month = now.getMonth();
        const year = now.getYear() + 1900;
        const date = now.getDate();
        const day = now.getDay()
        const local_events = {}
        local_events[year] = {}
        local_events[year][month] = {}
        local_events[year][month][date] = {
            day:day,
            now:true,
            events:[
            ],
        }

        if ('public' in calendars) {

            for (let i_event = 0; i_event < calendars.public.length; i_event +=1) {

                let date_start = Date()
                let date_end = Date()
                if ( 'date' in calendars.public[i_event].start ) {

                    date_start = new Date(calendars.public[i_event].start.date)
                    const offset = date_start.getTimezoneOffset()
                    date_start = new Date(date_start.getTime() + offset * 60 * 1000)

                }
                else if ( 'dateTime' in calendars.public[i_event].start ) {

                    const temp = new Date(Date.parse(calendars.public[i_event].start.dateTime))
                    temp.toLocaleString("en-US", {timeZone: calendars.public[i_event].start.timeZone})
                    date_start = temp

                }
                if ( 'date' in calendars.public[i_event].end )   {

                    date_end = new Date(calendars.public[i_event].end.date)
                    const offset = date_end.getTimezoneOffset()
                    date_end = new Date(date_end.getTime() + offset * 60 * 1000 - 1)

                }
                else if ( 'dateTime' in calendars.public[i_event].end )   {

                    const temp = new Date(Date.parse(calendars.public[i_event].end.dateTime))
                    temp.toLocaleString("en-US", {timeZone: calendars.public[i_event].end.timeZone})
                    date_end = temp

                }

                const ms = date_start.getMonth();
                const ys = date_start.getYear() + 1900;
                const dts = date_start.getDate();
                const das = date_start.getDay();
                const me = date_end.getMonth();
                const ye = date_end.getYear() + 1900;
                const dte = date_end.getDate();
                const dae = date_end.getDay();

                const shall_add_end = (ys !== ye) || (ms !== me) || (dts !== dte)

                if (!( ys in local_events)) { local_events[ys] = {}}
                if (!( ms in local_events[ys])) { local_events[ys][ms] = {}}
                if (!( dts in local_events[ys][ms])) { local_events[ys][ms][dts] = {day:das, now:false, events:[]} }
                if (!shall_add_end) {

                    local_events[ys][ms][dts].events.push({
                        start:date_start.toLocaleTimeString('en-US', {hour: '2-digit', minute:'2-digit'}),
                        end:date_end.toLocaleTimeString('en-US', {hour: '2-digit', minute:'2-digit'}),
                        type:'public',
                        summary:calendars.public[i_event].summary,
                        location:calendars.public[i_event].location,
                    })

                }
                else {

                    local_events[ys][ms][dts].events.push(
                        {
                            start:date_start.toLocaleTimeString('en-US', {hour: '2-digit', minute:'2-digit'}),
                            type:'public',
                            summary:calendars.public[i_event].summary,
                            location:calendars.public[i_event].location,
                        }

                    )
                    if (!( ye in local_events)) { local_events[ye] = {}}
                    if (!( me in local_events[ys])) { local_events[ye][me] = {}}
                    if (!( dte in local_events[ys][ms])) { local_events[ye][me][dte] = {day:dae, now:false, events:[]} }
                    local_events[ye][me][dte].events.push(
                        {
                            end:date_end.toLocaleTimeString('en-US', {hour: '2-digit', minute:'2-digit'}),
                            type:'public',
                            summary:calendars.public[i_event].summary,
                            location:calendars.public[i_event].location,
                        }

                    )

                }

            }

        }


        setLocalEvents(local_events)

    }, [calendars]);

    /* ----------- Define HTML --------- */
    return (
        <Fragment>
            <Container style={{ width:'100%', padding:0, position:'relative' }}>
                <Image name="events" style={{ width:'100%', pointerEvents: 'none' }}/>
            </Container>
            <Container>
                <Table>
                    <TableBody>
                        { Object.entries(localEvents).map((item, index) => { /* Loop on all members to create entries */

                            return(
                                <Fragment key={item}>
                                    { Object.entries(item[1]).map((jtem, jndex) => { /* Loop on all members to create entries */

                                        const label = `${months[jtem[0]]} ${item[0]}`
                                        return(
                                            <Fragment key={jtem}>
                                                <TableRow key={jndex}>
                                                    <TableCell colSpan={4} style={{border:'none'}}>
                                                        <EventsDivider textAlign='left'col={theme.palette.primary.main} >
                                                            <Chip style={{ color:theme.palette.primary.main }} label={label} />
                                                        </EventsDivider>
                                                    </TableCell>
                                                </TableRow>
                                                { Object.entries(jtem[1]).map((ktem, kndex) => { /* Loop on all members to create entries */

                                                    return(
                                                        <TableRow key={kndex}>
                                                            {(ktem[1].now) && (
                                                                <TableCell colSpan={1} style={{backgroundColor:theme.palette.primary.main, padding:5}}>
                                                                    <Typography style={{ textAlign:'center', color:theme.palette.common.white }}> {days[ktem[1].day]} </Typography>
                                                                    <Typography style={{ textAlign:'center', color:theme.palette.common.white }}> {[ktem[0]]} </Typography>
                                                                </TableCell>
                                                            )}
                                                            {!(ktem[1].now) && (
                                                                <TableCell colSpan={1} style={{padding:5}}>
                                                                    <Typography style={{ textAlign:'center' }}> {days[ktem[1].day]} </Typography>
                                                                    <Typography style={{ textAlign:'center' }}> {[ktem[0]]} </Typography>
                                                                </TableCell>
                                                            )}
                                                            <TableCell colSpan={3} style={{padding:5}}>
                                                                {(ktem[1].now) && (<Typography style={{ color:theme.palette.primary.main, fontSize:'14px'}}> Today </Typography>)}
                                                                { ktem[1].events.map((ltem, lndex) => { /* Loop on all members to create entries */

                                                                    return (
                                                                        <Fragment key={lndex}>
                                                                            <Typography style={{fontSize:'14px'}}>
                                                                                {('start' in ltem) && ( ltem.start )}
                                                                                {('start' in ltem) && ('end' in ltem) && ( ' - ' )}
                                                                                {('end' in ltem) && ( ltem.end )}
                                                                                : {ltem.summary}
                                                                                {('start' in ltem) && (!('end' in ltem)) && ( ' [START]' )}
                                                                                {(!('start' in ltem)) && ('end' in ltem) && ( ' [END]' )}
                                                                            </Typography>
                                                                            <Stack direction="row" alignItems="center">
                                                                                <LocationOn style={{height:'14px'}}/>
                                                                                <Typography style={{fontSize:'11px'}}> {ltem.location} </Typography>
                                                                            </Stack>
                                                                        </Fragment>
                                                                    )

                                                                })}

                                                            </TableCell>
                                                        </TableRow>
                                                    )

                                                })}

                                            </Fragment>
                                        )

                                    })}
                                </Fragment>
                            )


                        })}
                    </TableBody>
                </Table>
            </Container>
        </Fragment>
    );

}

export default Competitions;