import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import PostList from "./PostList";
import UserList from "./UserList"
import TagList from "./TagList";
import PostDetails from "./PostDetails";
import CategoryList from "./CategoryList";
import MyPostsList from "./MyPostsList";
import { AddTag } from "./AddTag";

export default function ApplicationViews({ isLoggedIn }) {

    const loggedInUser = localStorage.getItem("LoggedInUserType");
    console.log(loggedInUser);
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
                    {loggedInUser == 1 ? <UserList /> : <Redirect to="/login" />}
                </Route>

                <Route path="/tags" exact>
                    {isLoggedIn ? <TagList /> : <Redirect to="/login" />}
                </Route>
                <Route path="/addTag">
                    <AddTag />
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
