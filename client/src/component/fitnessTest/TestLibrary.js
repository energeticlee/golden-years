import React, { useReducer } from "react";
import { Link, Route, Switch } from "react-router-dom";
import PoseEstimation from "./tests/PoseEstimation";
import chairStand from "./tests/functions/chairStand";
import armCurl from "./tests/functions/armCurl";
import twoMinStepTest from "./tests/functions/twoMinStepTest";
import { useRouteMatch } from "react-router";
//* Add score to useReducer, and render overall result here then Post result to DB.

const TestLibrary = () => {
  let { path } = useRouteMatch();

  const actions = {
    setElbowAngle: "setElbowAngle",
    setKneeAngle: "setKneeAngle",
    setRightHipAngle: "setRightHipAngle",
    setLeftHipAngle: "setLeftHipAngle",
    setRepCount: "setRepCount",
    setRepPhase: "setRepPhase",
    setStartTime: "setStartTime",
    setEndTime: "setEndTime",
    setCompleted: "setCompleted",
    setReset: "setReset",
  };

  const renderjointAngle = (state, action) => {
    switch (action.type) {
      case actions.setElbowAngle:
        return { ...state, elbowAngle: action.payload };
      case actions.setKneeAngle:
        return { ...state, kneeAngle: action.payload };
      case actions.setRightHipAngle:
        return { ...state, rightHipAngle: action.payload };
      case actions.setLeftHipAngle:
        return { ...state, leftHipAngle: action.payload };
      case actions.setRepCount:
        return {
          ...state,
          repCount: (state.repCount + action.payload) * action.payload,
        };
      case actions.setRepPhase:
        return { ...state, repPhase: action.payload };
      case actions.setStartTime:
        return { ...state, startTime: action.payload };
      case actions.setEndTime:
        return { ...state, endTime: action.payload };
      case actions.setCompleted:
        return { ...state, completed: action.payload };
      case actions.setReset:
        return {
          ...state,
          repCount: 0,
          repPhase: "",
          startTime: 0,
          endTime: 0,
          completed: false,
        };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(renderjointAngle, {
    //! onClick - Reset Score && set completed to false
    elbowAngle: 0,
    kneeAngle: 0,
    rightHipAngle: 0,
    leftHipAngle: 0,
    repCount: 0,
    repPhase: "",
    startTime: 0,
    endTime: 0,
    completed: false,
    chairStandTime: 30,
    armCurlTime: 30,
    twoMinStepTime: 120,
  });

  const reducerPackage = { state, dispatch, actions };

  return (
    <div>
      <h1>Testing Library</h1>
      <div>
        <div>
          <Link to={`${path}/chairstand`}>
            <h2>30-Second Chair Stand</h2>
          </Link>
        </div>
        <div>
          <Link to={`${path}/armcurl`}>
            <h2>Arm Curl</h2>
          </Link>
        </div>
        <div>
          <Link to={`${path}/twominsteptest`}>
            <h2>2-Minute Step Test</h2>
          </Link>
        </div>
      </div>
      <main>
        <Switch>
          <Route path={`${path}/chairstand`}>
            <PoseEstimation
              reducerPackage={reducerPackage}
              props={chairStand}
            />
          </Route>

          <Route path={`${path}/armcurl`}>
            <PoseEstimation reducerPackage={reducerPackage} props={armCurl} />
          </Route>

          <Route path={`${path}/twominsteptest`}>
            <PoseEstimation
              reducerPackage={reducerPackage}
              props={twoMinStepTest}
            />
          </Route>
        </Switch>
      </main>
    </div>
  );
};

export default TestLibrary;
