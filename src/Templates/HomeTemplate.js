import React from 'react'
import Headers from '../component/Headers/Headers'
import { Route } from 'react-router-dom';
const HomeLayout = (props) => {
    return (
        <>
            <Headers />
            {props.children}
        </>
    )
}
const HomeTemplate = (props) => {
    return (
        <Route path={props.path} exact={props.exact} render={(propsComponent) => (
            <HomeLayout>
                <props.component {...propsComponent}></props.component>
            </HomeLayout>
        )} />
    )
}
export default HomeTemplate;
