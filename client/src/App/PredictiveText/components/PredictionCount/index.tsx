import * as React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { selectPredictionCountFromOwnProp } from "../../selectors";
import { AppState } from "../../../../store/setup";

interface OwnProps {
    keys: string;
}

interface MapStateToProps {
    predictionCount: number;
}

type PredictionCountProps = OwnProps & MapStateToProps;

const PredictionCount: React.FC<PredictionCountProps> = props => {
    const message =
        props.predictionCount === 0
            ? "Found no options!"
            : `Found ${String(props.predictionCount)} possible options!`;

    return <div>{message}</div>;
};

export const PredictionCountConnected = connect<MapStateToProps, null, OwnProps>(() =>
    createStructuredSelector<AppState, OwnProps, MapStateToProps>({
        predictionCount: selectPredictionCountFromOwnProp()
    })
)(PredictionCount);
