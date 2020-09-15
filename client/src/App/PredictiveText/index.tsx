import * as React from "react";
import { connect } from "react-redux";
import { debounce } from "lodash";

import { DispatchThunk } from "../../store/setup";
import { getPredictionsThunk } from "./thunks";
import { CurrentPredictionConnected } from "./components/CurrentPrediction";

interface MapDispatchToProps {
    getPrediction(keys: string): void;
}

type PredictiveTextProps = MapDispatchToProps;

interface PredictiveTextState {
    keys: string;
}

class PredictiveText extends React.Component<PredictiveTextProps, PredictiveTextState> {
    public state: PredictiveTextState = {
        keys: ""
    };

    private handleInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
        this.setState({ keys: e.target.value }, () => {
            this.getPredictionsDebounced(this.state.keys);
        });
    };

    private getPredictionsDebounced = debounce(this.props.getPrediction, 350);

    public render(): JSX.Element {
        return (
            <div>
                <input type="number" onChange={this.handleInput} value={this.state.keys} />
                <div>
                    <h2>Current Suggestion</h2>
                    <CurrentPredictionConnected keys={this.state.keys} />
                    <button type="button">Next Suggestion</button>
                </div>
            </div>
        );
    }
}

export const PredictiveTextConnected = connect<null, MapDispatchToProps>(
    null,
    (dispatch: DispatchThunk) => ({
        getPrediction(keys: string): void {
            dispatch(getPredictionsThunk(keys));
        }
    })
)(PredictiveText);
