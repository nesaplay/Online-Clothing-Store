import React from "react";
import { CURRENT_USER__QUERY } from "./User";
import Signin from "./Signin";
import { Query } from "react-apollo";

const PleaseSignIn = props => {
  return (
    <Query query={CURRENT_USER__QUERY}>
      {({ data, loading }) => {
        if (loading) return <p>loading...</p>;
        if (!data.me) {
          return (
            <div>
              <p>Please Sign In Before Continuing</p>
              <Signin />
            </div>
          );
        }
        return props.children;
      }}
    </Query>
  );
};

export default PleaseSignIn;
