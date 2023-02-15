
export const relativePointTo = (target, stage) => {
    const pos = stage.getNode().getPointerPosition()
    const absTrans = target.getNode().getAbsoluteTransform().copy();
    absTrans.invert()
    
    return absTrans.point(pos);
}