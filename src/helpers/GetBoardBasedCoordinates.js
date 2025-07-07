const GetBoardBasedCoordinates = (e, ref)=>{
    const {width, left, top} = ref.current.getBoundingClientRect()
    const size = width/8

    const y = Math.floor((e.clientX-left)/size)
    const x = Math.floor((e.clientY-top)/size)

    return [x, y];
  }

export default GetBoardBasedCoordinates;