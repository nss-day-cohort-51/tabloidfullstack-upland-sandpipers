import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import PostList from "./PostList";
import UserList from "./UserList"
import PostDetails from "./PostDetails";
import CategoryList from "./CategoryList";

export default function ApplicationViews({ isLoggedIn }) {

    const loggedInUser = sessionStorage.getItem("LoggedInUserType");

    return (
        <main>
            <Switch>
                <Route path="/" exact>
                    {isLoggedIn ? <PostList /> : <Redirect to="/login" />}
                </Route>

                <Route path="/posts" exact>
                    {isLoggedIn ? <PostList /> : <Redirect to="/login" />}
                </Route>
                <Route path="/users" exact>
                    {loggedInUser === 1 ? <UserList /> : <Redirect to="/login" />}
                </Route>

                <Route path="/posts/:id">
                    {isLoggedIn ? (
                        <PostDetails useparams />
                    ) : (
                        <Redirect to="/login" />
                    )}
                </Route>

                <Route path="/login">
                    <Login />
                </Route>

                <Route path="/register">
                    <Register />
                </Route>

                <Route path="/categories">
                    <CategoryList />
                </Route>
            </Switch>
        </main>
    );
}
