import * as React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import "./currentPrediction.scss";

import {
    hasFailed,
    Initial,
    Loading,
    RequestState,
    Success
} from "../../../../../lib/apiRequests/RequestState";
import { Spinner } from "../../../../components/Spinner";
import { AppState } from "../../../../store/setup";
import { selectCurrentPredictionFromOwnProp, selectRequestStateFromOwnProp } from "../../selectors";

interface OwnProps {
    keys: string;
}

interface MapStateToProps {
    prediction: string;
    requestState: RequestState;
}

type CurrentPredictionProps = OwnProps & MapStateToProps;

const CurrentPrediction: React.FC<CurrentPredictionProps> = props => {
    function renderRequestState(): React.ReactNode {
        if (hasFailed(props.requestState)) return props.requestState.error.message;

        switch (props.requestState) {
            case Initial:
                return "";

            case Loading:
                return <Spinner />;

            case Success:
                return props.prediction;

            default:
                return "";
        }
    }

    return (
        <div className="prediction--container flex--align-center flex--justify-center">
            <span className="prediction--text">{renderRequestState()}</span>
        </div>
    );
};

export const CurrentPredictionConnected = connect<MapStateToProps, {}, OwnProps>(() =>
    createStructuredSelector<AppState, OwnProps, MapStateToProps>({
        prediction: selectCurrentPredictionFromOwnProp(),
        requestState: selectRequestStateFromOwnProp()
    })
)(CurrentPrediction);
