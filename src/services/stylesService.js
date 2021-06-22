export const backgroundOpacity = { backgroundColor: 'rgba(255, 255, 255, 0.6)' }

export const aboutStyles = {
  backgroundColor: 'rgba(255, 255, 255, 0.6)',
  borderRadius: 20,
  fontSize: 17,
}

export const mainContentStyle = {
  backgroundColor: 'rgba(255, 255, 255, 0.7)',
  borderRadius: 5,
  fontWeight: 'normal',
  padding: 4,
}

const studyPattern = `repeating-linear-gradient(293deg, hsla(29,0%,50%,0.13) 0px,
transparent 7px,hsla(29,0%,50%,0.13) 12px,
transparent 19px,hsla(29,0%,50%,0.13) 24px,
transparent 31px,hsla(29,0%,50%,0.13) 36px),
repeating-linear-gradient(43deg, hsla(29,0%,50%,0.13) 0px,
transparent 7px,hsla(29,0%,50%,0.13) 12px,
transparent 19px,hsla(29,0%,50%,0.13) 24px,
transparent 31px,hsla(29,0%,50%,0.13) 36px),
repeating-linear-gradient(0deg, hsla(29,0%,50%,0.13) 0px,
transparent 7px,hsla(29,0%,50%,0.13) 12px,
transparent 19px,hsla(29,0%,50%,0.13) 24px,
transparent 31px,hsla(29,0%,50%,0.13) 36px),
linear-gradient(90deg, rgb(208,229,232),rgb(208,229,232))`

export const resourceStatusStudy = {
  height: 15,
  width: 15,
  // backgroundColor: 'rgba(0, 0, 0, 0.1)',
  backgroundImage: studyPattern,
  border: 'solid 1px rgba(0, 0, 0, 0.7)',
  borderRadius: 5,
  cursor: 'pointer',
}

export const cardBackgroundStudy = {
  backgroundImage: studyPattern,
  // backgroundColor: 'rgba(0, 0, 0, 0.2)',
}

const revisePattern = `repeating-linear-gradient(
  90deg, transparent 0px, transparent 0px,
  rgba(190,209,212, .8) 1px, rgba(208,229,232,.8) 10px)`

export const resourceStatusRevise = {
  height: 15,
  width: 15,
  backgroundImage: revisePattern,
  // backgroundColor: 'rgba(0, 0, 0, 0.3)',
  border: 'solid 1px rgba(0, 0, 0, 0.7)',
  borderRadius: 5,
  cursor: 'pointer',
}

export const cardBackgroundRevise = {
  backgroundImage: revisePattern,
  // backgroundImage:
  //   'repeating-linear-gradient(90deg, transparent 0px, transparent 0px,rgba(222,222,222, .5) 1px, rgba(251,251,251,.5) 10px),repeating-linear-gradient(14deg, transparent 0px, transparent 1px,rgba(251,251,251,.5) 1px, rgba(251,251,251,.5) 3px),linear-gradient(90deg, rgba(222,222,222,.5),rgba(222,222,222,.5))',
  // backgroundColor: 'rgba(0, 0, 0, 0.4)',
}

export const resourceStatusReset = {
  height: 15,
  width: 15,
  // backgroundColor: 'rgba(255, 255, 255, 0.5)',
  backgroundColor: 'rgba(208, 229, 232)',
  border: 'solid 1px rgba(0, 0, 0, 0.7)',
  borderRadius: 5,
  cursor: 'pointer',
}

export const appColumnsTitle = {
  backgroundColor: 'rgba(211, 215, 216)',
  borderRadius: 10,
  padding: '5px 10px',
  marginBottom: 10,
  border: '1px solid rgb(52, 58, 64)',
}

export const appsHeaderAndFormStyle = {
  backgroundImage: 'inherit',
  // backgroundImage: 'linear-gradient(#697a7C, #5dcdde)',
  overflowY: 'auto',
}
