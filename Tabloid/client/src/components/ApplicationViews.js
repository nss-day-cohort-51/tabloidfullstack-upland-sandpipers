import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import PostList from "./Posts/PostList";
import UserList from "./Users/UserList";
import TagList from "./Tags/TagList";
import PostDetails from "./Posts/PostDetails";
import CategoryList from "./Categories/CategoryList";
import MyPostsList from "./Posts/MyPostsList";
import AddComment from "./Comments/AddComment";
import AddCategory from "./Categories/AddCategory";
import EditTag from "./Tags/EditTag";
import DeleteTag from "./Tags/DeleteTag";
import { AddTag } from "./Tags/AddTag";
import { useState } from "react";
import { useEffect } from "react";
import DeletePost from "./DeletePost";
import RemoveCategory from "./RemoveCategory";

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
                <Route path="/deletepost/:id">
                    {isLoggedIn ? (
                        <DeletePost useparams />
                    ) : (
                        <Redirect to="/login" />
                    )}
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
                <Route path="/newComment/:id">
                    <AddComment userparams />
                </Route>

                <Route path="/removeCategory/:catId">
                    <RemoveCategory userparams />
                </Route>
                <Route path="/editTag/:id">
                    <EditTag userparams />
                </Route>
                <Route path="/deleteTag/:id">
                    <DeleteTag userparams />
                </Route>
            </Switch>
        </main>
    );
}
