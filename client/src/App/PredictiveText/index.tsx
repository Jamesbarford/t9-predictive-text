import * as React from "react";
import { connect } from "react-redux";
import { debounce } from "lodash";

import { DispatchThunk } from "../../store/setup";
import { getPredictionsThunk } from "./thunks";
import { CurrentPredictionConnected } from "./components/CurrentPrediction";
import { nextPrediction, previousPrediction } from "./actions";
import { PredictionCountConnected } from "./components/PredictionCount";

interface MapDispatchToProps {
    getPrediction(keys: string): void;
    nextPrediction(keys: string): void;
    previousPrediction(keys: string): void;
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

    private getNextPrediction = (): void => {
        this.props.nextPrediction(this.state.keys);
    };

    private previousPrediction = (): void => {
        this.props.previousPrediction(this.state.keys);
    };

    public render(): JSX.Element {
        return (
            <div className="flex flex-column">
                <div className="flex flex-column flex--align-center small--padded-item">
                    <h2>Current Suggestion</h2>
                    <PredictionCountConnected keys={this.state.keys} />
                    <CurrentPredictionConnected keys={this.state.keys} />

                    <div>
                        <button onClick={this.previousPrediction} type="button">
                            Previous Suggestion
                        </button>
                        <button onClick={this.getNextPrediction} type="button">
                            Next Suggestion
                        </button>
                    </div>
                </div>
                <input
                    className="small--padded-item"
                    type="number"
                    onChange={this.handleInput}
                    value={this.state.keys}
                />
            </div>
        );
    }
}

export const PredictiveTextConnected = connect<null, MapDispatchToProps>(
    null,
    (dispatch: DispatchThunk) => ({
        getPrediction(keys: string): void {
            dispatch(getPredictionsThunk(keys));
        },
        nextPrediction(keys: string): void {
            dispatch(nextPrediction(keys));
        },
        previousPrediction(keys: string): void {
            dispatch(previousPrediction(keys));
        }
    })
)(PredictiveText);
