import React from 'react'
import { MainPage } from './pages/MainPage'
import { ContactPage } from './pages/ContactPage'
import { RegisterPage } from './pages/RegisterPage'
import { SignInPage } from './pages/SignInPage'
import { ProfilePage } from './pages/ProfilePage'
import { TeamsPage } from './pages/TeamsPage'
import {Switch, Route, Redirect} from "react-router-dom";
import {DetailTeamPage} from "./pages/DetailTeamPage";
import {MyTeamsPage} from "./pages/MyTeamsPage";
import {DetailLeaderTeamPage} from "./pages/DetailLeaderTeamPage";
import {DetailUserTeamPage} from "./pages/DetailUserTeamPage"
import {LeaderTeamsPage} from "./pages/LeaderTeamsPage";
import {Products} from "./pages/Products";
import {DetailProduct} from "./pages/DetailProduct";
import {OrderPage} from "./pages/OrderPage";

export const useRoutes = (isAuthenticated) => {
    if(isAuthenticated){
        return(
            <Switch>
                <Route path="/" exact>
                    <MainPage />
                </Route>
                <Route path="/contact" exact>
                    <ContactPage />
                </Route>   
                <Route path="/profile" exact>
                    <ProfilePage />
                </Route> 
                <Route path="/teams" exact>
                    <TeamsPage />
                </Route>
                <Route path="/detail-team/:id">
                    <DetailTeamPage />
                </Route>
                <Route path="/teams" exact>
                    <TeamsPage />
                </Route>
                <Route path="/my-teams/:id">
                    <MyTeamsPage/>
                </Route>
                <Route path="/detail-leader-team/:id">
                    <DetailLeaderTeamPage/>
                </Route>
                <Route path="/detail-user-team/:id">
                    <DetailUserTeamPage/>
                </Route>
                <Route path="/leader-teams/:id">
                    <LeaderTeamsPage/>
                </Route>
                <Route path="/products" exact>
                    <Products/>
                </Route>
                <Route path="/product/:id">
                    <DetailProduct/>
                </Route>
                <Route path="/order/:id">
                    <OrderPage/>
                </Route>
                <Redirect to="/"/>
            </Switch>
        )
    }

    return(
        <Switch>
            <Route path="/" exact>
                <MainPage />
            </Route>
            <Route path="/contact" exact>
                <ContactPage />
            </Route>   
            <Route path="/signin" exact>
                <SignInPage />
            </Route>
            <Route path="/register" exact>
                <RegisterPage />
            </Route>             
            <Redirect to="/"/>
        </Switch>
    )
}