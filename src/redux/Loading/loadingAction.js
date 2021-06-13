import { SETLOADINGFALSE, SETLOADINGTRUE } from './loadingtype';

export const setLoadingFalse = () => {
  return {
    type: SETLOADINGFALSE,
  };
};

export const setLoadingTrue = () => {
  return {
    type: SETLOADINGTRUE,
  };
};
