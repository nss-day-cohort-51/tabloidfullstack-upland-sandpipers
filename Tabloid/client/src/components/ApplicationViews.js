import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import PostList from "./PostList";
import CategoryList from "./CategoryList";
import MyPostsList from "./MyPostsList";

export default function ApplicationViews({ isLoggedIn }) {
    return (
        <main>
            <Switch>
                <Route path="/" exact>
                    {isLoggedIn ? <PostList /> : <Redirect to="/login" />}
                </Route>
                <Route path="/posts" exact>
                    {isLoggedIn ? <PostList /> : <Redirect to="/login" />}
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

                <Route path="/myPosts">
                    <MyPostsList />
                </Route>
            </Switch>
        </main>
    );
}
