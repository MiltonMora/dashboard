import React from 'react'
import People from '@material-ui/icons/People';
import InboxIcon from '@material-ui/icons/Inbox';
import Business from '@material-ui/icons/Business';
import AssignmentInd from '@material-ui/icons/AssignmentInd';
import RecentActors from '@material-ui/icons/RecentActors';
import BusinessCenter from '@material-ui/icons/BusinessCenter';
import HomeWork from '@material-ui/icons/HomeWork';

const Icons = ({element}) => {
    switch(element) {
        case 'users':
            return (<People />)
        case 'perfil':
            return (<AssignmentInd />)
        case 'prefil-users':
            return (<RecentActors />)
        case 'business':
            return (<Business />)
        case 'business-user':
            return (<BusinessCenter />)
        case 'home':
            return (<HomeWork />)
        default:
            return (<InboxIcon />)
    }
}

export default Icons
