import React from "react";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createDrawerNavigator } from 'react-navigation-drawer'
import Menu from "./screens/Menu";
import AuthOrApp from "./screens/AuthOrApp";

import commonsStyles from "./commonsStyles";

const MenuConfig = {
    initialRouteName:'Today',
    contentComponent:Menu,
    contentOptions:{
        labelStyle:{
           fontFamily: commonsStyles.fontFamily,
           fontWeight:'normal',
           fontSize:20
        },
        activeLabelStyle:{
            color:'#080',
            fontWeight:'bold'
        }
    }
}

import Auth from "./screens/Auth";
import TaskList from "./screens/TaskList"


const menuRoutes = {
    Today:{
        name:'Today',
        screen: props => <TaskList title='Hoje' daysAhead={0} {...props} />,
        navigationOptions:{ 
            title:'Hoje'
        }
    },
    Tomorrow:{
        name:'Tomorrow',
        screen: props => <TaskList title='Amanhã' daysAhead={1} {...props}/>,
        navigationOptions:{
            title:'Amanhã'
        }
    },

    Week:{
        name:'Week',
        screen: props => <TaskList title='semana' daysAhead={7} {...props}/>,
        navigationOptions:{
            title:'Semana'
        }
    },

    Month:{
        name:'Month',
        screen: props => <TaskList title='Mês' daysAhead={30} {...props}/>,
        navigationOptions:{
            title:'Mês'
        }
    },
}

const menuNavigator = createDrawerNavigator(menuRoutes,MenuConfig)

const mainRoute = {
    AuthOrApp:{
      name:'AuthOrApp',
      screen:AuthOrApp
    },
    Auth:{
        name:'Auth',
        screen: Auth,
    },
    Home:{
        name:'Home',
        screen: menuNavigator
    }
}

const mainNavigetor = createSwitchNavigator(mainRoute,{
    initialRouteName:'AuthOrApp'
})

export default createAppContainer(mainNavigetor)