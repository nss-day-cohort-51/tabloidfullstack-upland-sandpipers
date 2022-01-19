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
import { AddCategory } from "./AddCategory";
import { AddTag } from "./AddTag";
import { useState } from "react";
import { useEffect } from "react";

export default function ApplicationViews({ isLoggedIn, isAdmin }) {

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
                    {isAdmin ? <UserList /> : <Redirect to="/login" />}
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
                <Route path="/addCategory">
                    <AddCategory />
                </Route>

                <Route path="/myPosts">
                    <MyPostsList />
                </Route>
            </Switch>
        </main>
    );
}
