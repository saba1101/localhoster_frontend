import { Fragment } from "react";
const Login = ({ data, updateFormValues }) => {
  return (
    <Fragment>
      <h2>Login</h2>
      <ul>
        {data?.map((element, index) => {
          return (
            <li key={index}>
              <element.component
                {...element.props}
                onChange={(event) => updateFormValues(event, element.key)}
              />
            </li>
          );
        })}
      </ul>
    </Fragment>
  );
};

export default Login;
