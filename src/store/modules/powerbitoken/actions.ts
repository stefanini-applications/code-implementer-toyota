
export const actionsTypes = {
  POWER_BI_TOKEN_REQUEST: '@powerbitoken/POWER_BI_TOKEN_REQUEST',
  POWER_BI_TOKEN_SUCCESS: '@powerbitoken/POWER_BI_TOKEN_SUCCESS',
  POWER_BI_TOKEN_FAILURE: '@powerbitoken/POWER_BI_TOKEN_FAILURE',
  HEATMAP_TOKEN_REQUEST: '@powerbitoken/HEATMAP_TOKEN_REQUEST',
  HEATMAP_TOKEN_SUCCESS: '@powerbitoken/HEATMAP_TOKEN_SUCCESS',
  HEATMAP_TOKEN_FAILURE: '@powerbitoken/HEATMAP_TOKEN_FAILURE'
};

const baseSelector = (state: { powerbitoken: any }) => state.powerbitoken;

export function getPowerBiTokenRequest() {
  return {
    type: actionsTypes.POWER_BI_TOKEN_REQUEST
  };
}

export function getPowerBiTokenSuccess(results: any) {
  return {
    type: actionsTypes.POWER_BI_TOKEN_SUCCESS,
    payload: results
  };
}

export function getPowerBiTokenFailure() {
  return { type: actionsTypes.POWER_BI_TOKEN_FAILURE };
}

export function getHeatMapTokenRequest() {
  return {
    type: actionsTypes.HEATMAP_TOKEN_REQUEST
  };
}

export function getHeatMapTokenSuccess(results: any) {
  return {
    type: actionsTypes.HEATMAP_TOKEN_SUCCESS,
    payload: results
  };
}

export function getHeatMapTokenFailure() {
  return { type: actionsTypes.HEATMAP_TOKEN_FAILURE };
}

export const selectors = {
  powerbitoken: (state: { powerbitoken: any }) =>
    baseSelector(state).powerbitoken?.data?.message,
  heatmapToken: (state: { powerbitoken: any }) =>
    baseSelector(state).heatmapToken?.data?.message
};
