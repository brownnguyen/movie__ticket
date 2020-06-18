import React from 'react'
import { Route } from 'react-router-dom';
const UserLayout = (props) => {
    return (
        <>
            {props.children}
        </>
    )
}
export default function UserTemplate(props) {
    return (
        <Route path={props.path} exact={props.exact} render={(propsComponent) => {
            return (
                <UserLayout style={{ with: "100%", height: "100%", backgroundColor: "black" }}>
                    <props.component {...propsComponent}></props.component>
                </UserLayout>
            )
        }} />
    )
}
