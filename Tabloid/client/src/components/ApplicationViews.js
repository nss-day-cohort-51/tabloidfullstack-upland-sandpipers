import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import PostList from "./PostList";
import TagList from "./TagList";
import PostDetails from "./PostDetails";
import CategoryList from "./CategoryList";
import MyPostsList from "./MyPostsList";

export default function ApplicationViews({ isLoggedIn }) {
let isAdmin = localStorage.getItem("LoggedInUserType") == 1
    return (
        <main>
            <Switch>
                <Route path="/" exact>
                    {isLoggedIn ? <PostList /> : <Redirect to="/login" />}
                </Route>

                <Route path="/posts" exact>
                    {isLoggedIn ? <PostList /> : <Redirect to="/login" />}
                </Route>
                <Route path="/tags" exact>
                    {isAdmin ? <TagList /> : <Redirect to="/login" />}
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

                <Route path="/myPosts">
                    <MyPostsList />
                </Route>
            </Switch>
        </main>
    );
}
